import fs from "fs";
import path from "path";

// Function to recursively read all files in a directory
function getMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getMarkdownFiles(filePath, fileList);
    } else if (filePath.endsWith(".md")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Function to extract titles and generate links
function extractTitlesAndLinks(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const links = [];

  // Make the file path relative to the index.md file
  const relativeFilePath = path.relative(path.join("src"), filePath);

  lines.forEach((line) => {
    const titleMatch = line.match(/^#+\s+(.*)/); // Match Markdown titles
    if (titleMatch) {
      const title = titleMatch[1].trim();
      const anchor = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      links.push(`[${title}](${relativeFilePath}#${anchor})`);
    }
  });

  return links;
}

// Function to convert a string to PascalCase
function toPascalCase(text) {
  return text
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Main function
function generateLinks(folderPath) {
  const markdownFiles = getMarkdownFiles(folderPath);
  const groupedLinks = {};

  markdownFiles.forEach((filePath) => {
    const folderName = path.basename(path.dirname(filePath));
    const formattedFolderName = toPascalCase(folderName); // Convert folder name to PascalCase
    const links = extractTitlesAndLinks(filePath);

    if (!groupedLinks[formattedFolderName]) {
      groupedLinks[formattedFolderName] = [];
    }
    groupedLinks[formattedFolderName].push(...links);
  });

  let output = "# Index\n\n";
  let chapterNumber = 1;

  for (const [folderName, links] of Object.entries(groupedLinks)) {
    output += `## ${folderName}\n\n`;
    output += links.map((link) => `- ${link}`).join("\n") + "\n\n";
    chapterNumber++;
  }

  return output;
}

// Specify the folder containing Markdown files
const folderPath = path.join("src", "chapters");
const markdownIndex = generateLinks(folderPath);

// Output the links
const outputPath = path.join("src", "index.md");
fs.writeFileSync(outputPath, markdownIndex, "utf-8");
console.log(`Index written to ${outputPath}`);
