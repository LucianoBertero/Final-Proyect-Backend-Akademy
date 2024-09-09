import { Router } from "express";
import { check } from "express-validator";
import validateFields from "../middleware/validate-fields.middleware";
import UserController from "../controllers/user.controller";
import { verifyJwt } from "../middleware/validate-jwt.middleware";
import verifyRoles from "../middleware/validate-role.middleware";
import apicache from "apicache";

export let cache = apicache.middleware;

class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * /user/newUser:
     *   post:
     *     summary: Crear un nuevo usuario
     *     description: Permite crear un nuevo usuario en el sistema.
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: "John Doe"
     *               email:
     *                 type: string
     *                 example: "john.doe@example.com"
     *               password:
     *                 type: string
     *                 example: "securepassword"
     *               role:
     *                 type: string
     *                 example: "admin"
     *     responses:
     *       201:
     *         description: Usuario creado exitosamente
     *       400:
     *         description: Solicitud inválida
     *       401:
     *         description: No autorizado
     *     tags:
     *       - Users
     */
    this.router.post(
      "/newUser",
      [
        check("name", "User is required").notEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check(
          "password",
          "Password must be at least 6 characters long"
        ).isLength({ min: 6 }),
        check("role", "Role is required").notEmpty(),
        validateFields,
        verifyJwt,
        verifyRoles(["admin"]),
      ],
      UserController.createUser
    );

    /**
     * @openapi
     * /user/getUsers:
     *   get:
     *     summary: Obtener todos los usuarios
     *     description: Obtiene una lista de todos los usuarios en el sistema.
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de usuarios obtenida exitosamente
     *       401:
     *         description: No autorizado
     *     tags:
     *       - Users
     */
    this.router.get(
      "/getUsers",
      [verifyJwt, verifyRoles(["admin"])],
      UserController.getUsers
    );
  }
}

export default new UserRoutes().router;
