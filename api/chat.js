import { sql } from '@vercel/postgres';

const GROQ_MODEL = 'llama-3.3-70b-versatile';

const MILESTONE_OPENERS = {
  day_30: "Hey {name}, you've been with us a month now! How's it going so far - settling in okay?",
  anniversary: "Happy work anniversary, {name}! Looking back at the year, what's stood out for you?",
  post_appraisal: "Hi {name}, now that appraisals are wrapped up, how are you feeling about the conversation with your manager?"
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { employee_id, message, milestone_type } = req.body;

    if (!employee_id) {
      return res.status(400).json({ error: 'employee_id is required' });
    }

    const { rows: empRows } = await sql`SELECT * FROM employees WHERE id = ${employee_id}`;
    const employee = empRows[0];
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    if (!message && milestone_type) {
      const template = MILESTONE_OPENERS[milestone_type] || "Hi {name}, how are things going?";
      const opener = template.replace('{name}', employee.name);

      await sql`
        INSERT INTO conversations (employee_id, message, sender)
        VALUES (${employee_id}, ${opener}, 'bot')
      `;

      return res.status(200).json({ reply: opener });
    }

    if (!message) {
      return res.status(400).json({ error: 'message is required when not triggering a milestone' });
    }

    await sql`
      INSERT INTO conversations (employee_id, message, sender)
      VALUES (${employee_id}, ${message}, 'employee')
    `;

    const { rows: history } = await sql`
      SELECT sender, message FROM conversations
      WHERE employee_id = ${employee_id}
      ORDER BY created_at DESC
      LIMIT 10
    `;
    history.reverse();

    const chatMessages = [
      {
        role: 'system',
        content: `You are Amber, a warm and empathetic HR companion bot. You check in on employees, listen without judgment, and never sound robotic or scripted. Keep replies short (2-4 sentences) and conversational. Never give definitive HR policy answers you're not certain about - offer to connect the employee to HR for those instead. Employee name: ${employee.name}.`
      },
      ...history.slice(0, -1).map(h => ({
        role: h.sender === 'bot' ? 'assistant' : 'user',
        content: h.message
      })),
      { role: 'user', content: message }
    ];

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: chatMessages,
        max_tokens: 300
      })
    });

    if (!groqRes.ok) {
      console.error('Groq API error:', await groqRes.text());
      return res.status(502).json({ error: 'LLM provider error' });
    }

    const data = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || "Sorry, I'm having trouble responding right now.";

    await sql`
      INSERT INTO conversations (employee_id, message, sender)
      VALUES (${employee_id}, ${reply}, 'bot')
    `;

    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    try {
      await fetch(`${baseUrl}/api/sentiment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee_id, message })
      });
    } catch (err) {
      console.error('Sentiment call failed:', err);
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('chat.js error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
