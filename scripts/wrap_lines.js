import fs from "fs";
import path from "path";

const MAX_LENGTH = 66;

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

// Splits a line into its prefix (indent, list marker, blockquote) and text,
// plus the prefix to use on wrapped continuation lines.
function splitPrefix(line) {
  const match = line.match(/^(\s*(?:>\s*)*)((?:[-*+]|\d+[.)])\s+)?(.*)$/);
  const lead = match[1];
  const marker = match[2] ?? "";
  return {
    prefix: lead + marker,
    continuationPrefix: lead + " ".repeat(marker.length),
    text: match[3],
  };
}

// Splits text on whitespace, keeping inline code spans as single words
function splitWords(text) {
  const words = [];
  let current = "";
  let inCode = false;

  for (const char of text) {
    if (char === "`") inCode = !inCode;
    if (!inCode && /\s/.test(char)) {
      if (current) words.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  if (current) words.push(current);

  return words;
}

// Fills one line with as many words as fit, returning the leftover words
function fill(prefix, words) {
  let line = prefix;
  let i = 0;
  for (; i < words.length; i++) {
    const candidate = i === 0 ? line + words[i] : `${line} ${words[i]}`;
    if (i > 0 && candidate.length > MAX_LENGTH) break;
    line = candidate;
  }
  return { line, rest: words.slice(i) };
}

// Lines that begin a new block and must not absorb words from the line above
function startsBlock(line) {
  return (
    line.trim() === "" ||
    /^\s*(!\[|<)/.test(line) ||
    /^\s*(?:>\s*)*(?:[-*+]|\d+[.)])\s+/.test(line)
  );
}

function wrapFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const eol = content.includes("\r\n") ? "\r\n" : "\n";
  const lines = content.split(/\r?\n/);

  const output = [];
  let carry = [];
  let carryPrefix = "";
  let inCodeBlock = false;

  const flushCarry = () => {
    while (carry.length) {
      const { line, rest } = fill(carryPrefix, carry);
      output.push(line);
      carry = rest;
    }
  };

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      flushCarry();
      inCodeBlock = !inCodeBlock;
      output.push(line);
      continue;
    }
    // Leave headers, code blocks and tables untouched
    if (inCodeBlock || /^\s*[#|]/.test(line)) {
      flushCarry();
      output.push(line);
      continue;
    }
    if (carry.length && startsBlock(line)) flushCarry();
    if (!carry.length && line.length <= MAX_LENGTH) {
      output.push(line);
      continue;
    }

    const hardBreak = / {2,}$/.test(line);
    const { prefix, continuationPrefix, text } = splitPrefix(line.trimEnd());
    const { line: filled, rest } = fill(prefix, [
      ...carry,
      ...splitWords(text),
    ]);
    output.push(filled);
    carry = rest;
    carryPrefix = continuationPrefix;

    if (hardBreak) {
      flushCarry();
      output[output.length - 1] += "  ";
    }
  }
  flushCarry();

  const updated = output.join(eol);
  if (updated !== content) {
    fs.writeFileSync(filePath, updated, "utf-8");
    console.log(`Wrapped lines in: ${filePath}`);
  }
}

const folderPath = process.argv[2] ?? path.join("src", "chapters");
getMarkdownFiles(folderPath).forEach(wrapFile);
