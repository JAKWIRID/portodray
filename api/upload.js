import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { filename, content } = req.body;

    if (!filename || !content) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const api = "https://api.github.com/repos/USERNAME/REPO/contents/uploads/" + filename;

    const r = await fetch(api, {
      method: "PUT",
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "upload file",
        content, // base64
      }),
    });

    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
}
