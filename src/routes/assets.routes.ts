import { Router } from "express";
import { check } from "express-validator";
import validateFields from "../middleware/validate-fields.middleware";
import AssetController from "../controllers/asset.controller";
import { verifyJwt } from "../middleware/validate-jwt.middleware";
import verifyRoles from "../middleware/validate-role.middleware";

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
        check("asigned_employee"),
        check("asigned_date"),
        validateFields,
        verifyJwt,
        verifyRoles(["admin", "user"]),
      ],
      AssetController.registerAsset
    );

    this.router.get(
      "/getAssets",
      [verifyJwt, verifyRoles(["admin", "user"])],
      AssetController.getAssets
    );

    this.router.put(
      "/deletedAsset/:id",
      [verifyJwt, verifyRoles(["admin"])],
      AssetController.deletedAsset
    );

    this.router.get(
      "/getAsset/:id",
      [verifyJwt, verifyRoles(["admin", "user"])],
      AssetController.getAsset
    );

    this.router.put(
      "/updateAsset/:id",
      [
        check("name", "Please include name").notEmpty(),
        check("description", "Please include a description").notEmpty(),
        check("category", "Please include a category").notEmpty(),
        check("assigned_employee"),
        check("assigned_date", ""),
        check("isDeleted", ""),
        validateFields,
        verifyJwt,
        verifyRoles(["admin", "user"]),
      ],
      AssetController.updateAsset
    );

    this.router.put(
      "/restoreAsset/:id",
      [verifyJwt, verifyRoles(["admin"])],
      AssetController.restoreAsset
    );
  }
}

export default new AssetsRoutes().router;
