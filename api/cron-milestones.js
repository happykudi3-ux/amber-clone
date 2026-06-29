import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { rows: day30 } = await sql`
      SELECT id, name FROM employees
      WHERE join_date = CURRENT_DATE - INTERVAL '30 days'
    `;

    const { rows: anniversaries } = await sql`
      SELECT id, name FROM employees
      WHERE EXTRACT(MONTH FROM join_date) = EXTRACT(MONTH FROM CURRENT_DATE)
        AND EXTRACT(DAY FROM join_date) = EXTRACT(DAY FROM CURRENT_DATE)
        AND join_date < CURRENT_DATE - INTERVAL '1 year'
    `;

    const triggered = [];

    for (const emp of day30) {
      await sql`
        INSERT INTO milestones (employee_id, type, trigger_date, status)
        VALUES (${emp.id}, 'day_30', CURRENT_DATE, 'pending')
      `;
      triggered.push({ employee_id: emp.id, type: 'day_30' });
    }

    for (const emp of anniversaries) {
      await sql`
        INSERT INTO milestones (employee_id, type, trigger_date, status)
        VALUES (${emp.id}, 'anniversary', CURRENT_DATE, 'pending')
      `;
      triggered.push({ employee_id: emp.id, type: 'anniversary' });
    }

    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

    for (const t of triggered) {
      await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee_id: t.employee_id, milestone_type: t.type })
      }).catch(err => console.error(`Failed to trigger milestone for employee ${t.employee_id}:`, err));
    }

    return res.status(200).json({ triggered: triggered.length, details: triggered });
  } catch (err) {
    console.error('cron-milestones.js error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
