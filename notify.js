// api/notify.js
// Vercel Serverless Function — receives "500 domains done" pings
// from the Toolwaly tool and emails the owner via Resend.

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { client_name, domain_count, date_time, secret } = req.body || {};

    // Simple shared-secret check so random people can't spam your email
    // Set TOOL_SECRET in Vercel environment variables to any string you like.
    if (process.env.TOOL_SECRET && secret !== process.env.TOOL_SECRET) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const safeClient = client_name || "Unknown Client";
    const safeCount = domain_count || "?";
    const safeTime = date_time || new Date().toISOString();

    // Send email via Resend
    const emailResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL, // e.g. "Toolwaly <notify@yourdomain.com>" or Resend's onboarding sender
        to: process.env.TO_EMAIL,     // your personal email, where YOU want alerts
        subject: `Toolwaly: ${safeClient} ne ${safeCount} domains complete kiye`,
        text:
          `Client: ${safeClient}\n` +
          `Domains Checked: ${safeCount}\n` +
          `Date/Time: ${safeTime}\n\n` +
          `Ye email automatic bheji gayi hai Toolwaly Domain Checker se.`,
      }),
    });

    if (!emailResp.ok) {
      const errText = await emailResp.text();
      console.error("Resend error:", errText);
      return res.status(502).json({ error: "Email send failed" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
