export default class UserController {
  public getUser(id: number): Record<string, any> {
    const user = getUserById(id);

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    return user;
  }
}
