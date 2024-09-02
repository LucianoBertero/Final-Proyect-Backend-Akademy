import { Router } from "express";
import { check } from "express-validator";
import validateFields from "../middleware/validate-fields.middleware";
import UserController from "../controllers/user.controller";

class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/newUser",
      [
        check("name", "User is required").notEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check(
          "password",
          "Password must be at least 6 characters long"
        ).isLength({ min: 6 }),
        check("role", "Role is required").notEmpty(),
        validateFields,
      ],
      UserController.createUser
    );
  }
}

export default new UserRoutes().router;
