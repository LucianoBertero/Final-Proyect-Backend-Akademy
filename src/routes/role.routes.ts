import { Router } from "express";
import RoleController from "../controllers/role.controller";
import apicache from "apicache";
import { verifyJwt } from "../middleware/validate-jwt.middleware";
import verifyRoles from "../middleware/validate-role.middleware";
export let cache = apicache.middleware;

class RolesRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/getAllRoles",
      [cache("5 minutes"), verifyJwt, verifyRoles(["admin", "user"])],
      RoleController.getRoles
    );
  }
}

export default new RolesRoutes().router;
