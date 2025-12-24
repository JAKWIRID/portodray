export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return res.status(500).json({ error: "GITHUB_TOKEN missing" });
    }

    const { filename, content } = req.body;

    if (!filename || !content) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    // 🔥 PENTING: buang prefix base64
    const cleanBase64 = content.replace(/^data:.*;base64,/, "");

    const apiUrl = `https://api.github.com/repos/JAKWIRID/portodray/contents/uploads/${filename}`;

    const githubRes = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `upload ${filename}`,
        content: cleanBase64,
      }),
    });

    const data = await githubRes.json();

    if (!githubRes.ok) {
      return res.status(500).json(data);
    }

    return res.status(200).json({
      success: true,
      url: data.content.download_url,
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
