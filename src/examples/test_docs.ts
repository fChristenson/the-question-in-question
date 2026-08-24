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
