import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, dept, milestone } = req.body;
  const firstName = name?.split(" ")[0];

  const milestoneLine = milestone
    ? `<p style="margin: 0 0 8px;"><strong>🎯 Milestone:</strong> This is their <strong>${milestone === 365 ? "1 Year" : `${milestone}-Day`}</strong> check-in!</p>`
    : `<p style="margin: 0 0 8px; color: #888;">No milestone due today.</p>`;

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #F8F7FF; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="font-size: 40px;">🧞</span>
        <h2 style="color: #1a1a2e; margin: 8px 0 4px;">Check-in Alert</h2>
        <p style="color: #666; margin: 0;">An employee just opened the check-in form</p>
      </div>
      <div style="background: #fff; border-radius: 12px; padding: 20px 24px; border: 1px solid #ebebeb;">
        <p style="margin: 0 0 8px;"><strong>👤 Name:</strong> ${name}</p>
        <p style="margin: 0 0 8px;"><strong>🏢 Department:</strong> ${dept}</p>
        ${milestoneLine}
        <hr style="border: none; border-top: 1px solid #ebebeb; margin: 16px 0;" />
        <a href="https://amber-clone-eight.vercel.app/dashboard" style="display: block; text-align: center; background: #6C5CE7; color: #fff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px;">
          View Dashboard →
        </a>
      </div>
      <p style="text-align: center; color: #bbb; font-size: 12px; margin-top: 16px;">
        Sent by Genie · ClickTigers HR
      </p>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Genie HR" <${process.env.GMAIL_USER}>`,
      to: "connect2kushi@gmail.com",
      subject: `🧞 ${firstName} just opened their check-in form`,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Email failed" });
  }
}
