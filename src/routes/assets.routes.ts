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
        check("asigned_employee").notEmpty(),
        check("asigned_date", "").notEmpty(),

        validateFields,
      ],
      AssetController.registerAsset
    );

    this.router.get("/getAssets", [], AssetController.getAssets);

    this.router.put("/deletedAsset/:id", [], AssetController.deletedAsset);

    this.router.get("/getAsset/:id", [], AssetController.getAsset);

    this.router.put(
      "/updateAsset/:id",
      [
        check("name", "Please include name").notEmpty(),
        check("description", "Please include a description").notEmpty(),
        check("category", "Please include a category").notEmpty(),
        check("assigned_employee"),
        check("assigned_date", ""),
        check("isDeleted", ""),
      ],
      AssetController.updateAsset
    );

    this.router.put("/restoreAsset/:id", [], AssetController.restoreAsset);
  }
}

export default new AssetsRoutes().router;
