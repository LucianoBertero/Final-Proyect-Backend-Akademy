import { Router } from "express";
import CategoriesController from "../controllers/categories.controller";

class CategoriesRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/getAllCategories",
      [],
      CategoriesController.getCategories
    );
  }
}

export default new CategoriesRoutes().router;
