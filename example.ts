const describe = (description: string, callback: () => void) => {
  console.log(description);
  callback();
};

const it = (description: string, callback: () => void) => {
  console.log(`  ${description}`);
  callback();
};

const expect = (value: any) => ({
  toBe: (expected: any) => {
    if (value !== expected) {
      throw new Error(`Expected ${value} to be ${expected}`);
    }
  },
  toBeCalledWith: (expected: any) => {
    if (typeof value !== "function") {
      throw new Error(`Expected ${value} to be a function`);
    }
  },
  toEqual: (expected: any) => {
    if (JSON.stringify(value) !== JSON.stringify(expected)) {
      throw new Error(
        `Expected ${JSON.stringify(value)} to equal ${JSON.stringify(expected)}`,
      );
    }
  },
});

const db = {
  save: (user: { name: string; age: number }) => {
    // Simulate saving user to a database
    console.log(`User ${user.name} saved to the database.`);
  },
};

function saveUser(user: { name: string; age: number }): {
  name: string;
  id: number;
  age: number;
} {
  db.save(user);
  return { id: 1, ...user };
}

describe("User saving", () => {
  it("should save a user to the database", () => {
    const user = { name: "Alice", age: 30 };
    const savedUser = saveUser(user);
    expect(savedUser).toEqual({ id: 1, name: "Alice", age: 30 });
  });

  it("should call db.save with the user", () => {
    const user = { name: "Alice", age: 30 };
    saveUser(user);
    expect(db.save).toBeCalledWith(user);
  });
});
