export default class UserController {
  public listUsers(request: Request, response: Response): void {
    const { offset, limit } = request.query;
    const users = getUsers(offset, limit);
    return response.json(users);
  }
}
