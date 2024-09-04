import { Router } from "express";
import RoleController from "../controllers/role.controller";
import apicache from "apicache";
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
      [cache("5 minutes")],
      RoleController.getRoles
    );
  }
}

export default new RolesRoutes().router;
