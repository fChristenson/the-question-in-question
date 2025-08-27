// Function using internal date object
function MyFunction() {
  const date = new Date();
  // Function logic
  return date;
}

// Better for testing
function MyFunction2(date = new Date()) {
  // Function logic
  return date;
}
