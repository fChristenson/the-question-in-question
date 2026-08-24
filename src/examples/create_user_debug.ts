class UserController {
  public static async CreateUser(req: Request) {
    console.debug(JSON.stringify(req));

    const body = await req.json();
    console.debug(JSON.stringify(body));

    var user = CreateUser(body);
    console.debug(JSON.stringify(user));

    return new Response(JSON.stringify(user), { status: 200 });
  }
}

function CreateUser(userData: any): object {
  console.debug(JSON.stringify(userData));
  // Save user to database
  return { name: userData.name, email: userData.email };
}
