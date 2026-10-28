const user = {
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
};

function toUpperCaseName(text: string) {
  return text.toUpperCase();
}

console.log(toUpperCaseName(user.name));
