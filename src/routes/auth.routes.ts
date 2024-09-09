import { Router } from "express";
import { check } from "express-validator";
import validateFields from "../middleware/validate-fields.middleware";
import AuthController from "../controllers/auth.controller";

class AuthRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * /auth:
     *   post:
     *     summary: Iniciar sesión
     *     description: Permite a los usuarios iniciar sesión proporcionando un correo electrónico y una contraseña.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: "john.doe@example.com"
     *               password:
     *                 type: string
     *                 example: "securepassword"
     *     responses:
     *       200:
     *         description: Inicio de sesión exitoso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
     *       400:
     *         description: Solicitud inválida
     *       401:
     *         description: Credenciales no válidas
     *     tags:
     *       - Auth
     */
    this.router.post(
      "/",
      [
        check("email", "Please include a valid email").isEmail().notEmpty(),
        check("password", "Password must be at least 6 characters long")
          .isLength({ min: 6 })
          .notEmpty(),
        validateFields,
      ],
      AuthController.login
    );
  }
}

export default new AuthRoutes().router;
