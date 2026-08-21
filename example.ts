class HttpError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BaseError extends HttpError {
  constructor({
    expected,
    actual,
    name,
    statusCode,
  }: {
    expected: string;
    actual: string;
    name: string;
    statusCode: number;
  }) {
    super(
      `Error ${name}. Expected: ${expected}, Actual: ${actual}`,
      statusCode,
    );
  }
}

class UserNotFoundError extends BaseError {
  constructor(id: number) {
    super({
      expected: `User with ID ${id}`,
      actual: `User not found`,
      name: "UserNotFoundError",
      statusCode: 404,
    });
  }
}

export default class UserController {
  public getUser(id: number): Record<string, any> {
    const user = getUserById(id);

    if (!user) {
      throw new UserNotFoundError(id);
    }

    return user;
  }
}

function getUserById(id: number): Record<string, any> {
  // Simulate fetching user data from a database or API
  return { id, name: `User with ID: ${id}` };
}
