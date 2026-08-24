import fs from "fs";
import path from "path";
import { codeToHtml } from "shiki";
import puppeteer from "puppeteer";

const EXAMPLES_DIR = path.join("src", "examples");
const OUTPUT_DIR = path.join("src", "chapters", "assets");
const THEME = "dark-plus";

function getTargetFiles() {
  const args = process.argv.slice(2);

  if (args.length > 0) {
    return args.map((arg) => (arg.endsWith(".ts") ? arg : `${arg}.ts`));
  }

  return fs.readdirSync(EXAMPLES_DIR).filter((file) => file.endsWith(".ts"));
}

function buildPage(highlightedCode) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  html, body {
    margin: 0;
    padding: 0;
  }
  .wrapper {
    display: inline-block;
    padding: 40px;
    background: linear-gradient(135deg, #cfd9e3, #7e93a8);
  }
  .window {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  }
  .titlebar {
    height: 40px;
    background: #1e1e1e;
    display: flex;
    align-items: center;
    gap: 8px;
    padding-left: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .dot.red { background: #ff5f56; }
  .dot.yellow { background: #ffbd2e; }
  .dot.green { background: #27c93f; }
  .shiki {
    margin: 0;
    padding: 20px 24px;
    font-family: "Cascadia Code", Consolas, Menlo, monospace;
    font-size: 14px;
    line-height: 1.6;
    counter-reset: line;
  }
  .shiki .line {
    counter-increment: line;
    position: relative;
    padding-left: 3em;
  }
  .shiki .line::before {
    content: counter(line);
    position: absolute;
    left: 0;
    width: 2.2em;
    text-align: right;
    color: #6e7681;
    user-select: none;
  }
</style>
</head>
<body>
  <div class="wrapper">
    <div class="window">
      <div class="titlebar">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
      </div>
      ${highlightedCode}
    </div>
  </div>
</body>
</html>`;
}

async function generateSnapshot(browser, fileName) {
  const sourcePath = path.join(EXAMPLES_DIR, fileName);
  const code = fs.readFileSync(sourcePath, "utf-8");
  const highlightedCode = await codeToHtml(code, {
    lang: "ts",
    theme: THEME,
  });

  const page = await browser.newPage();
  await page.setContent(buildPage(highlightedCode), {
    waitUntil: "networkidle0",
  });

  const box = await page.evaluate(() => {
    const el = document.querySelector(".wrapper");
    const rect = el.getBoundingClientRect();
    return { width: Math.ceil(rect.width), height: Math.ceil(rect.height) };
  });

  await page.setViewport(box);

  const wrapper = await page.$(".wrapper");
  const outputPath = path.join(OUTPUT_DIR, fileName.replace(/\.ts$/, ".png"));
  await wrapper.screenshot({ path: outputPath });
  await page.close();

  console.log(`Generated ${outputPath}`);
}

async function main() {
  const files = getTargetFiles();
  const browser = await puppeteer.launch();

  try {
    for (const file of files) {
      await generateSnapshot(browser, file);
    }
  } finally {
    await browser.close();
  }
}

main();
