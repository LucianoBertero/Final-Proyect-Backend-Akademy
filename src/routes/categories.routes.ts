import { Router } from "express";
import CategoriesController from "../controllers/categories.controller";
import apicache from "apicache";
import verifyRoles from "../middleware/validate-role.middleware";
import { verifyJwt } from "../middleware/validate-jwt.middleware";
export let cache = apicache.middleware;

class CategoriesRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * /categories/getAllCategories:
     *   get:
     *     summary: Obtener todas las categorías
     *     description: Obtiene una lista de todas las categorías disponibles en el sistema.
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de categorías obtenida exitosamente
     *       401:
     *         description: No autorizado
     *     tags:
     *       - Categories
     */

    this.router.get(
      "/getAllCategories",
      [cache("5 minutes"), verifyJwt, verifyRoles(["admin", "user"])],
      CategoriesController.getCategories
    );
  }
}

export default new CategoriesRoutes().router;
