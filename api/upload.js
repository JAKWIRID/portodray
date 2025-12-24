export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).json({ error: "GITHUB_TOKEN missing" });
  }

  try {
    const { filename, content } = req.body;

    if (!filename || !content) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const api = `https://api.github.com/repos/USERNAME/REPO/contents/uploads/${filename}`;

    const githubRes = await fetch(api, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `upload ${filename}`,
        content, // base64
      }),
    });

    const data = await githubRes.json();

    if (!githubRes.ok) {
      return res.status(500).json(data);
    }

    res.status(200).json({ success: true, data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
