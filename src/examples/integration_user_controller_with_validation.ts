export class UserController {
  public listUsers(request: Request, response: Response): void {
    const { offset, limit, search } = request.query;
    validateApiToken(request);
    const users = getUsers(offset, limit, search);
    return response.json(users);
  }

  public getUser(request: Request, response: Response): void {
    const { id } = request.params;
    validateApiToken(request);
    const user = getUserById(id);
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    return response.json(user);
  }

  public updateUser(request: Request, response: Response): void {
    const { id } = request.params;
    validateApiToken(request);
    const updatedUser = updateUserById(id, request.body);
    if (!updatedUser) {
      return response.status(404).json({ error: "User not found" });
    }
    return response.json(updatedUser);
  }

  public deleteUser(request: Request, response: Response): void {
    const { id } = request.params;
    validateApiToken(request);
    const deleted = deleteUserById(id);
    if (!deleted) {
      return response.status(404).json({ error: "User not found" });
    }
    return response.status(204).send();
  }
}
