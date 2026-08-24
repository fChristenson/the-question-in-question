const policies = [
  "user.read",
  "user.read.me",
  "user.write",
  "user.write.me",
  "user.delete",
  "user.delete.me",
];

export class UserController {
  public updateUser(request: Request, response: Response): void {
    const { id } = request.params;
    const policies = validateApiToken(request);
    let updatedUser: any | null = null;
    if (
      !policies.includes("user.write") &&
      !policies.includes("user.write.me")
    ) {
      return response.status(403).json({ error: "Forbidden" });
    }

    if (policies.includes("user.write")) {
      updatedUser = updateUserById(id, request.body);
      if (!updatedUser) {
        return response.status(404).json({ error: "User not found" });
      }
    } else if (policies.includes("user.write.me")) {
      validateUserOwnership(request, id);
      updatedUser = updateUserById(id, request.body);
      if (!updatedUser) {
        return response.status(404).json({ error: "User not found" });
      }
    }

    return response.json(updatedUser);
  }
}
