import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const sql = neon(process.env.GENIE_DB_URL);

    const today = new Date().toISOString().split("T")[0];

    const [avgRow] = await sql`
      SELECT ROUND(AVG(mood)::numeric, 1) AS avg_mood
      FROM mood_checkins
    `;

    const [todayRow] = await sql`
      SELECT COUNT(*) AS checkins_today
      FROM mood_checkins
      WHERE submitted_at::date = ${today}::date
    `;

    const deptRows = await sql`
      SELECT dept, ROUND(AVG(mood)::numeric, 1) AS avg_mood
      FROM mood_checkins
      GROUP BY dept
      ORDER BY avg_mood DESC
      LIMIT 1
    `;

    const [totalRow] = await sql`
      SELECT COUNT(*) AS total
      FROM mood_checkins
    `;

    return res.status(200).json({
      avg_mood: avgRow?.avg_mood ?? null,
      checkins_today: Number(todayRow?.checkins_today ?? 0),
      happiest_dept: deptRows[0]?.dept ?? null,
      happiest_dept_score: deptRows[0]?.avg_mood ?? null,
      total_checkins: Number(totalRow?.total ?? 0),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error" });
  }
}
