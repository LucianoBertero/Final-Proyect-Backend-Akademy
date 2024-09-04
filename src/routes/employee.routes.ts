import { Router } from "express";
import EmployeeController from "../controllers/employe.controller";

import apicache from "apicache";
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
      [cache("5 minutes")],
      EmployeeController.getEmployees
    );
  }
}

export default new EmployeeRoutes().router;
