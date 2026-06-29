export async function scoreSentiment(message) {
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
    throw new Error(`Groq API error: ${await groqRes.text()}`);
  }

  const data = await groqRes.json();
  const raw = data.choices?.[0]?.message?.content || '{}';
  const clean = raw.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
}
