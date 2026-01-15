// Password Configuration for ZenoExploit
// Change this password to your desired value
const ZENO_PASSWORD = "ZENOUPDATE";

// List of available files in the /project/ folder
const PROJECT_FILES = [
  {
    id: 1,
    name: "ZENO_EXPLOIT.apk",
    description: "Version 5.2.2",
    size: "20 MB",
    downloads: 150,
    icon: "🦠",
    category: "Security",
    downloadUrl: "https://files.cloudkuimages.guru/files/176d6c8cc7e5.apk",
    directDownload: true
  }
];

// Function to verify password
function verifyPassword(inputPassword) {
  return inputPassword === ZENO_PASSWORD;
}
