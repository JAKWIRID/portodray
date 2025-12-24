export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ success: false, error: "URL kosong" });
    }

    const params = new URLSearchParams();
    params.append("url", url);
    params.append("hd", "1");

    const tikwmRes = await fetch("https://tikwm.com/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent": "Mozilla/5.0"
      },
      body: params.toString()
    });

    const json = await tikwmRes.json();

    if (!json.data || !json.data.play) {
      return res.status(500).json({ success: false, error: "Video tidak ditemukan" });
    }

    return res.status(200).json({
      success: true,
      title: json.data.title,
      video: json.data.play, // no watermark
      music: json.data.music,
      cover: json.data.cover
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
