class UserController {
  public static CreateUser = addDebugLogging(async (req: Request) => {
    const body = await req.json();

    var user = createUserWithLogging(body);

    return new Response(JSON.stringify(user), { status: 200 });
  });
}

function CreateUser(userData: any): object {
  // Save user to database
  return { name: userData.name, email: userData.email };
}

const createUserWithLogging = addDebugLogging(CreateUser);

function addDebugLogging(fn: (...args: any[]) => any) {
  return (...args: any[]) => {
    console.debug(`Calling ${fn.name} with args:`, JSON.stringify(args));
    const result = fn(...args);
    console.debug(`Result from ${fn.name}:`, JSON.stringify(result));
    return result;
  };
}
