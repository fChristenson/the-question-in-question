import express from "express";
import {
  UserController,
  ProductController,
  OrderController,
} from "./controllers.ts";

const app = express();

UserController.AddEndpoints(app);
ProductController.AddEndpoints(app);
OrderController.AddEndpoints(app);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
