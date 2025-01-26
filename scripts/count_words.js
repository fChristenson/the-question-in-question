import fs from "fs";
import path from "path";

const filePath = process.argv[2];
const maxWords = 300;

if (!fs.statSync(filePath).isDirectory()) {
  throw new Error("Expected filepath to be a directory!");
}

countWords(filePath);

function countWords(filePath) {
  if (fs.statSync(filePath).isDirectory()) {
    const files = fs.readdirSync(filePath);
    for (const file of files) {
      countWords(path.join(filePath, file));
    }

    return;
  }

  const text = fs.readFileSync(filePath, "utf-8");
  const count = text.split(" ").filter((s) => !!s).length;

  if (count > maxWords) {
    throw new Error(
      `${filePath} has ${count} words but max allowed words is ${maxWords}!`
    );
  }

  console.log(`${filePath} has ${count} words.`);
}
