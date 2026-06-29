import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { employee_id, message } = req.body;
    if (!employee_id || !message) {
      return res.status(400).json({ error: 'employee_id and message are required' });
    }

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content:
              'Classify the employee message below. Respond with ONLY valid JSON, no markdown formatting, no preamble. Schema: {"sentiment": "positive" | "neutral" | "negative", "concern_score": <integer 1-5, 5 = most concerning>, "tags": [array of zero or more from: "comp", "manager", "workload", "growth", "other"]}'
          },
          { role: 'user', content: message }
        ],
        max_tokens: 150
      })
    });

    if (!groqRes.ok) {
      console.error('Groq API error:', await groqRes.text());
      return res.status(502).json({ error: 'LLM provider error' });
    }

    const data = await groqRes.json();
    const raw = data.choices?.[0]?.message?.content || '{}';
    const clean = raw.replace(/```json|```/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch {
      console.error('Could not parse sentiment JSON:', raw);
      return res.status(200).json({ ok: false, reason: 'parse_failed' });
    }

    const { rows: convRows } = await sql`
      SELECT id FROM conversations
      WHERE employee_id = ${employee_id} AND sender = 'employee' AND message = ${message}
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (convRows[0]) {
      const convId = convRows[0].id;
      await sql`
        UPDATE conversations
        SET sentiment = ${parsed.sentiment || null},
            concern_score = ${parsed.concern_score || null},
            tags = ${JSON.stringify(parsed.tags || [])}
        WHERE id = ${convId}
      `;
    }

    return res.status(200).json({ ok: true, ...parsed });
  } catch (err) {
    console.error('sentiment.js error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

