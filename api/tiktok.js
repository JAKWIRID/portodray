import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL required" });
  }

  try {
    const params = new URLSearchParams();
    params.set("url", url);
    params.set("hd", "1");

    const response = await axios.post(
      "https://tikwm.com/api/",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "User-Agent": "Mozilla/5.0"
        }
      }
    );

    const v = response.data?.data;
    if (!v?.play) {
      return res.status(500).json({ error: "Failed fetch video" });
    }

    res.status(200).json({
      success: true,
      title: v.title,
      cover: v.cover,
      video: v.play,          // no watermark
      music: v.music
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
