import { Router } from "express";
import CategoriesController from "../controllers/categories.controller";
import apicache from "apicache";
import verifyRoles from "../middleware/validate-role.middleware";
import { verifyJwt } from "../middleware/validate-jwt.middleware";
export let cache = apicache.middleware;

class CategoriesRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/getAllCategories",
      [cache("5 minutes"), verifyJwt, verifyRoles(["admin", "user"])],
      CategoriesController.getCategories
    );
  }
}

export default new CategoriesRoutes().router;
