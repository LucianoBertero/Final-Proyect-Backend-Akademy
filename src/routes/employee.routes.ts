import { Router } from "express";
import EmployeeController from "../controllers/employe.controller";

import apicache from "apicache";
import { verifyJwt } from "../middleware/validate-jwt.middleware";
import verifyRoles from "../middleware/validate-role.middleware";
export let cache = apicache.middleware;

class EmployeeRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/getAllEmployees",
      [cache("5 minutes"), verifyJwt, verifyRoles(["admin", "user"])],
      EmployeeController.getEmployees
    );
  }
}

export default new EmployeeRoutes().router;
