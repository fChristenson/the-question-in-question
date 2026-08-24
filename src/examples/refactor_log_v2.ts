const v2: boolean = false;

function logWithTimeStamp(...args: any[]): void {
  const timeStamp = new Date().toISOString();
  console.log(`Timestamp: ${timeStamp}`);
  consoleLogArray(args);
}

function consoleLogArray(arr: any[]): void {
  if (v2) {
    consoleLogArrayV2(arr);
    return;
  }

  arr.forEach((item) => {
    console.log(item);
  });
}

function consoleLogArrayV2(arr: any[]): void {
  for (const item of arr) {
    console.log(item);
  }
}
