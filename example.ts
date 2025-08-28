class UserController {
  public static async CreateUser(req: Request, res: Response) {
    const body = await req.json();
    var user = CreateUser(body.name, body.email);
    return new Response(JSON.stringify(user), { status: 200 });
  }
}

function CreateUser(name: string, email: string): object {
  // Save user to database
  return { name, email };
}
