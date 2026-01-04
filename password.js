// Password Configuration for ZenoExploit
// Change this password to your desired value
const ZENO_PASSWORD = "ZENONEW";

// List of available files in the /project/ folder
const PROJECT_FILES = [
  {
    id: 1,
    name: "ZENO_EXPLOIT.apk",
    description: "Version 5.2.2",
    size: "32 MB",
    downloads: 150,
    icon: "🦠",
    category: "Security",
    downloadUrl: "https://files.cloudkuimages.guru/files/f1f1c0bfa23f.apk",
    directDownload: true
  }
];

// Function to verify password
function verifyPassword(inputPassword) {
  return inputPassword === ZENO_PASSWORD;
}
