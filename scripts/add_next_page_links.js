import fs from "fs";
import path from "path";

// Function to get all page files in a directory, sorted by page number
function getPageFiles(dir) {
  const files = fs.readdirSync(dir);
  return files
    .filter(file => file.startsWith("page_") && file.endsWith(".md"))
    .sort((a, b) => {
      const numA = parseInt(a.match(/page_(\d+)/)[1]);
      const numB = parseInt(b.match(/page_(\d+)/)[1]);
      return numA - numB;
    });
}

// Function to get all chapter directories
function getChapterDirectories(chaptersDir) {
  const items = fs.readdirSync(chaptersDir);
  return items.filter(item => {
    const itemPath = path.join(chaptersDir, item);
    return fs.statSync(itemPath).isDirectory();
  });
}

// Function to add next page link to a file
function addNextPageLink(filePath, nextPagePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  
  // Check if there's already a navigation section
  const navRegex = /\n---\n\n### Navigation\n.*$/s;
  const existingNav = content.match(navRegex);
  
  let updatedContent;
  if (existingNav) {
    // Replace existing navigation
    updatedContent = content.replace(navRegex, `\n---\n\n### Navigation\n\n[Next Page](${nextPagePath})\n`);
  } else {
    // Add new navigation section
    const trimmedContent = content.trim();
    updatedContent = `${trimmedContent}\n\n---\n\n### Navigation\n\n[Next Page](${nextPagePath})\n`;
  }
  
  fs.writeFileSync(filePath, updatedContent, "utf-8");
}

// Function to remove navigation section from the last page in a chapter
function removeNavigationSection(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const navRegex = /\n---\n\n### Navigation\n.*$/s;
  const updatedContent = content.replace(navRegex, "\n");
  fs.writeFileSync(filePath, updatedContent.trim() + "\n", "utf-8");
}

// Main function
function addNextPageLinks() {
  const chaptersDir = path.join("src", "chapters");
  const chapterDirs = getChapterDirectories(chaptersDir);
  
  chapterDirs.forEach(chapterDir => {
    const chapterPath = path.join(chaptersDir, chapterDir);
    const pageFiles = getPageFiles(chapterPath);
    
    console.log(`Processing chapter: ${chapterDir}`);
    console.log(`Found ${pageFiles.length} pages`);
    
    pageFiles.forEach((pageFile, index) => {
      const currentPagePath = path.join(chapterPath, pageFile);
      
      if (index < pageFiles.length - 1) {
        // Not the last page, add link to next page
        const nextPageFile = pageFiles[index + 1];
        const nextPageRelativePath = path.join(chapterDir, nextPageFile).replace(/\\/g, "/");
        
        console.log(`  Adding next page link to ${pageFile} -> ${nextPageFile}`);
        addNextPageLink(currentPagePath, nextPageRelativePath);
      } else {
        // Last page in chapter, remove navigation section if it exists
        console.log(`  Removing navigation from last page: ${pageFile}`);
        removeNavigationSection(currentPagePath);
      }
    });
  });
  
  console.log("Finished adding next page links!");
}

// Run the script
addNextPageLinks();
