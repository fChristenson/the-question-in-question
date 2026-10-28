const user = {
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
};

export default function toUpperCaseName(user: {
  name: string;
  age: number;
  email: string;
}) {
  return user.name.toUpperCase();
}

console.log(toUpperCaseName(user));
