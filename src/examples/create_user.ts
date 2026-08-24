class UserController {
  public static async CreateUser(req: Request) {
    const body = await req.json();

    var user = CreateUser(body);

    return new Response(JSON.stringify(user), { status: 200 });
  }
}

function CreateUser(userData: any): object {
  // Save user to database
  return { name: userData.name, email: userData.email };
}
