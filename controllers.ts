class UserController {
  public static AddEndpoints(app: any) {
    app.post("/users", (req: any, res: any) => {
      // Logic to add a user
      res.send("User added");
    });
  }
}
class ProductController {
  public static AddEndpoints(app: any) {
    app.post("/products", (req: any, res: any) => {
      // Logic to add a product
      res.send("Product added");
    });
  }
}
class OrderController {
  public static AddEndpoints(app: any) {
    app.post("/orders", (req: any, res: any) => {
      // Logic to add an order
      res.send("Order added");
    });
  }
}
export { UserController, ProductController, OrderController };
