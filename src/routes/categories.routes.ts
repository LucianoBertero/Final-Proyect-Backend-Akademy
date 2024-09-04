import { Router } from "express";
import CategoriesController from "../controllers/categories.controller";
import apicache from "apicache";
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
      [cache("5 minutes")],
      CategoriesController.getCategories
    );
  }
}

export default new CategoriesRoutes().router;
