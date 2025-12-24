export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).json({ error: "GITHUB_TOKEN missing" });
  }

  try {
    const { content, ext } = req.body;
    if (!content || !ext) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    // random 5–9 huruf
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const len = Math.floor(Math.random() * 5) + 5;
    let name = "";
    for (let i = 0; i < len; i++) {
      name += chars[Math.floor(Math.random() * chars.length)];
    }

    const filename = `${name}.${ext}`;
    const path = `${filename}`;

    const api = `https://api.github.com/repos/JAKWIRID/portodray/contents/${path}`;

    const githubRes = await fetch(api, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `upload ${filename}`,
        content,
      }),
    });

    const data = await githubRes.json();
    if (!githubRes.ok) return res.status(500).json(data);

    res.status(200).json({
      success: true,
      url: `https://dray.vercel.app/${filename}`,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
