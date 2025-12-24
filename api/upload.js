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
  return Array.from({length: len}, () =>
    chars[Math.floor(Math.random()*chars.length)]
  ).join("");
}

export default async function handler(req, res) {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    const file = files.file[0];
    const buffer = fs.readFileSync(file.filepath);
    const ext = file.originalFilename.split(".").pop();

    const name = randomName(5 + Math.floor(Math.random()*4));
    const filename = `${name}.${ext}`;

    const githubRes = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FOLDER}/${filename}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: "upload media",
          content: buffer.toString("base64")
        })
      }
    );

    if (!githubRes.ok) {
      return res.status(500).json({ error: "GitHub upload failed" });
    }

    const url = `https://raw.githubusercontent.com/${OWNER}/${REPO}/main/${FOLDER}/${filename}`;
    res.json({ url });
  });
}
