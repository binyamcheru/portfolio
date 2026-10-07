// Renders /resume from a running dev/prod server to public/Binyam_Cheru_Resume.pdf.
// Usage: npm run resume:pdf   (optionally RESUME_URL=... CHROME_PATH=...)
import { existsSync } from "node:fs";
import { chromium } from "playwright-core";

const url = process.env.RESUME_URL ?? "http://localhost:3000/resume";
const out = "public/Binyam_Cheru_Resume.pdf";
const candidates = [
  process.env.CHROME_PATH,
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));
if (!executablePath) {
  console.error("No Chrome/Chromium found. Set CHROME_PATH.");
  process.exit(1);
}

const browser = await chromium.launch({ executablePath, headless: true });
try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: out,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "11mm", right: "14mm", bottom: "11mm", left: "14mm" },
  });
  console.log(`Wrote ${out}`);
} finally {
  await browser.close();
}
