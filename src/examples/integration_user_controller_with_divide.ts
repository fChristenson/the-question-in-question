export class UserController {
  public listUsers(request: Request, response: Response): void {
    const { offset, limit } = request.query;
    const users = getUsers(offset, limit);
    return response.json(users);
  }
}

export class IntegrationUserController {
  public listUsers(request: Request, response: Response): void {
    const { offset, limit, search } = request.query;
    const apiToken = request.headers.authorization;
    if (!apiToken || isValidApiToken(apiToken) === false) {
      return response.status(401).json({ error: "Unauthorized" });
    }
    const users = getUsers(offset, limit, search);
    return response.json(users);
  }
}
