class UserController {
  public static async CreateUser(req: Request) {
    const body = await req.json();

    var validUserData = new ValidUserData(body.name, body.email);
    var user = CreateUser(validUserData);

    return new Response(JSON.stringify(user), { status: 200 });
  }
}

function CreateUser(validUserData: ValidUserData): object {
  // Save user to database
  return { name: validUserData.name, email: validUserData.email };
}

class ValidUserData {
  public readonly name: string;
  public readonly email: string;

  constructor(name: string, email: string) {
    if (!name || !email) {
      throw new Error("Invalid user data");
    }

    this.name = name;
    this.email = email;
  }
}
