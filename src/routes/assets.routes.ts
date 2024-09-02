import { Router } from "express";
import { check } from "express-validator";
import validateFields from "../middleware/validate-fields.middleware";
import AssetController from "../controllers/asset.controller";

class AssetsRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/registerAsset",
      [
        check("name", "Please include name").notEmpty(),

        check("description", "Please include a description").notEmpty(),
        check("category", "Please include a category").notEmpty(),
        check("assigned_employee"),
        check("assigned_date", ""),

        validateFields,
      ],
      AssetController.registerAsset
    );
  }
}

export default new AssetsRoutes().router;
