import { Router } from "express";
import { check } from "express-validator";
import validateFields from "../middleware/validate-fields.middleware";
import AuthController from "../controllers/auth.controller";

class AuthRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/",
      [
        check("email", "Please include a valid email").isEmail().notEmpty(),
        check("password", "Password must be at least 6 characters long")
          .isLength({ min: 6 })
          .notEmpty(),
        validateFields,
      ],
      AuthController.login
    );
  }
}

export default new AuthRoutes().router;
