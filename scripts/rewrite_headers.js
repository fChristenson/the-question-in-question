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

// Function to convert a string to PascalCase
function toPascalCase(text) {
  return text
    .split(/\s+/) // Split on spaces
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Function to rewrite headers in a Markdown file
function rewriteHeaders(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  const updatedLines = lines.map((line) => {
    const headerMatch = line.match(/^(#+)\s+(.*)/); // Match Markdown headers
    if (headerMatch) {
      const hashes = headerMatch[1];
      const headerText = headerMatch[2];
      const pascalCaseHeader = toPascalCase(headerText);
      return `${hashes} ${pascalCaseHeader}`;
    }
    return line;
  });

  fs.writeFileSync(filePath, updatedLines.join("\n"), "utf-8");
  console.log(`Rewritten headers in: ${filePath}`);
}

// Main function
function rewriteAllHeaders(folderPath) {
  const markdownFiles = getMarkdownFiles(folderPath);
  markdownFiles.forEach((filePath) => {
    rewriteHeaders(filePath);
  });
}

// Specify the folder containing Markdown files
const folderPath = path.join("src", "chapters");
rewriteAllHeaders(folderPath);
