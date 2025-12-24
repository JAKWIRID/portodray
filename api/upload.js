import fetch from "node-fetch";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: { bodyParser: false }
};

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = "JAKWIRID";
const REPO = "portodray";
const FOLDER = "media";

function randomName(len) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  return Array.from({ length: len }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) throw err;

      const file = Array.isArray(files.file)
        ? files.file[0]
        : files.file;

      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const buffer = fs.readFileSync(file.filepath);
      const ext = file.originalFilename.split(".").pop();
      const filename = `${randomName(8)}.${ext}`;

      const githubRes = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FOLDER}/${filename}`,
        {
          method: "PUT",
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
            "User-Agent": "vercel-upload"
          },
          body: JSON.stringify({
            message: "upload media",
            content: buffer.toString("base64")
          })
        }
      );

      if (!githubRes.ok) {
        const text = await githubRes.text();
        return res.status(500).json({ error: text });
      }

      const url = `https://raw.githubusercontent.com/${OWNER}/${REPO}/main/${FOLDER}/${filename}`;
      res.json({ url });

    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Upload failed" });
    }
  });
}
