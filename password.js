// Password Configuration for ZenoExploit
// Change this password to your desired value
const ZENO_PASSWORD = "DRAY22";

// List of available files in the /project/ folder
const PROJECT_FILES = [
  {
    id: 1,
    name: "ZENO_EXPLOIT.apk",
    description: "Version 4.7.2",
    size: "32 MB",
    downloads: 1284,
    icon: "🦠",
    category: "Security"
  }
];

// Function to verify password
function verifyPassword(inputPassword) {
  return inputPassword === ZENO_PASSWORD;
}
