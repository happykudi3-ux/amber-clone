import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { employee_id, employee_name, dept, mood, note } = req.body;

  if (!employee_id || !mood) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const sql = neon(process.env.GENIE_DB_URL);
    await sql`
      INSERT INTO mood_checkins (employee_id, employee_name, dept, mood, note)
      VALUES (${employee_id}, ${employee_name}, ${dept}, ${mood}, ${note || null})
    `;
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error" });
  }
}
