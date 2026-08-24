function logWithTimeStamp(...args: any[]): void {
  const timeStamp = new Date().toISOString();
  console.log(`Timestamp: ${timeStamp}`);
  consoleLogArray(args);
}

function consoleLogArray(arr: any[]): void {
  arr.forEach((item) => {
    console.log(item);
  });
}
