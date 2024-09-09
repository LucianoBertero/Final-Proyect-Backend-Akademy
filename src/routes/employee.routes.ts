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
    /**
     * @openapi
     * /employee/getAllEmployees:
     *   get:
     *     summary: Obtener todos los empleados
     *     description: Obtiene una lista de todos los empleados en el sistema.
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de empleados obtenida exitosamente
     *       401:
     *         description: No autorizado
     *     tags:
     *       - Employees
     */
    this.router.get(
      "/getAllEmployees",
      [cache("5 minutes"), verifyJwt, verifyRoles(["admin", "user"])],
      EmployeeController.getEmployees
    );
  }
}

export default new EmployeeRoutes().router;
