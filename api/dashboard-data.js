import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { rows } = await sql`
      WITH recent AS (
        SELECT
          employee_id,
          sentiment,
          concern_score,
          tags,
          ROW_NUMBER() OVER (PARTITION BY employee_id ORDER BY created_at DESC) AS rn
        FROM conversations
        WHERE sender = 'employee' AND concern_score IS NOT NULL
      )
      SELECT
        e.id,
        e.name,
        e.join_date,
        e.manager_email,
        AVG(r.concern_score) AS avg_concern,
        COUNT(*) FILTER (WHERE r.sentiment = 'negative') AS negative_count,
        jsonb_agg(DISTINCT r.tags) AS recent_tags
      FROM employees e
      JOIN recent r ON r.employee_id = e.id AND r.rn <= 3
      GROUP BY e.id, e.name, e.join_date, e.manager_email
      ORDER BY avg_concern DESC NULLS LAST
    `;

    const withRiskBucket = rows.map(r => {
      const avg = parseFloat(r.avg_concern) || 0;
      let risk = 'low';
      if (avg >= 4 || r.negative_count >= 2) risk = 'high';
      else if (avg >= 2.5) risk = 'medium';
      return { ...r, risk };
    });

    return res.status(200).json({ employees: withRiskBucket });
  } catch (err) {
    console.error('dashboard-data.js error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
