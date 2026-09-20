import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "content.json");

export function getContent() {
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

export function saveContent(content) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(content, null, 2), "utf-8");
}