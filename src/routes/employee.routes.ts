import { Router } from "express";
import EmployeeController from "../controllers/employe.controller";
class EmployeeRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/getAllEmployees", [], EmployeeController.getEmployees);
  }
}

export default new EmployeeRoutes().router;
