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
    /**
     * @openapi
     * /roles/getAllRoles:
     *   get:
     *     summary: Obtener todos los roles
     *     description: Obtiene una lista de todos los roles en el sistema.
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de roles obtenida exitosamente
     *       401:
     *         description: No autorizado
     *     tags:
     *       - Roles
     */
    this.router.get(
      "/getAllRoles",
      [cache("5 minutes"), verifyJwt, verifyRoles(["admin", "user"])],
      RoleController.getRoles
    );
  }
}

export default new RolesRoutes().router;
