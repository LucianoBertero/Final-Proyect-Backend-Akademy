import { Router } from "express";
import { check } from "express-validator";
import validateFields from "../middleware/validate-fields.middleware";
import AssetController from "../controllers/asset.controller";
import { verifyJwt } from "../middleware/validate-jwt.middleware";
import verifyRoles from "../middleware/validate-role.middleware";

class AssetsRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * /asset/registerAsset:
     *   post:
     *     summary: Registrar un nuevo activo
     *     description: Permite registrar un nuevo activo en el sistema.
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
     *                 example: "Laptop"
     *               description:
     *                 type: string
     *                 example: "Laptop personal"
     *               category:
     *                 type: string
     *                 example: "60c72b2f4f1f4f1f2c4b8d4b"
     *               assigned_employee:
     *                 type: string
     *                 example: "60c72b2f4f1f4f1f2c4b8d4c"
     *               assigned_date:
     *                 type: string
     *                 format: date-time
     *                 example: "2024-09-08T12:00:00Z"
     *     responses:
     *       200:
     *         description: Activo registrado exitosamente
     *       401:
     *         description: No autorizado
     *       400:
     *         description: Solicitud inválida
     *     tags:
     *       - Assets
     */

    this.router.post(
      "/registerAsset",
      [
        check("name", "Please include name").notEmpty(),
        check("description", "Please include a description").notEmpty(),
        check("category", "Please include a category").notEmpty(),
        check("assigned_employee"),
        check("assigned_date"),
        validateFields,
        verifyJwt,
        verifyRoles(["admin", "user"]),
      ],
      AssetController.registerAsset
    );

    /**
     * @openapi
     * /asset/getAssets:
     *   get:
     *     summary: Obtener todos los activos
     *     description: Obtiene la lista de todos los activos.
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de activos
     *       401:
     *         description: No autorizado
     *     tags:
     *       - Assets
     */
    this.router.get(
      "/getAssets",
      [verifyJwt, verifyRoles(["admin", "user"])],
      AssetController.getAssets
    );

    /**
     * @openapi
     * /asset/deletedAsset/{id}:
     *   put:
     *     summary: Eliminar un activo
     *     description: Marca un activo como eliminado.
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del activo a eliminar
     *     responses:
     *       200:
     *         description: Activo eliminado exitosamente
     *       401:
     *         description: No autorizado
     *       400:
     *         description: Solicitud inválida
     *     tags:
     *       - Assets
     */
    this.router.put(
      "/deletedAsset/:id",
      [verifyJwt, verifyRoles(["admin"])],
      AssetController.deletedAsset
    );

    /**
     * @openapi
     * /asset/getAsset/{id}:
     *   get:
     *     summary: Obtener un activo por ID
     *     description: Obtiene los detalles de un activo específico por su ID.
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del activo a obtener
     *     responses:
     *       200:
     *         description: Activo obtenido exitosamente
     *       401:
     *         description: No autorizado
     *       404:
     *         description: Activo no encontrado
     *     tags:
     *       - Assets
     */
    this.router.get(
      "/getAsset/:id",
      [verifyJwt, verifyRoles(["admin", "user"])],
      AssetController.getAsset
    );

    /**
     * @openapi
     * /asset/updateAsset/{id}:
     *   put:
     *     summary: Actualizar un activo
     *     description: Actualiza la información de un activo existente.
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del activo a actualizar
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: "Laptop"
     *               description:
     *                 type: string
     *                 example: "Laptop personal"
     *               category:
     *                 type: string
     *                 example: "60c72b2f4f1f4f1f2c4b8d4b"
     *               assigned_employee:
     *                 type: string
     *                 example: "60c72b2f4f1f4f1f2c4b8d4c"
     *               assigned_date:
     *                 type: string
     *                 format: date-time
     *                 example: "2024-09-08T12:00:00Z"
     *               isDeleted:
     *                 type: boolean
     *                 example: false
     *     responses:
     *       200:
     *         description: Activo actualizado exitosamente
     *       401:
     *         description: No autorizado
     *       400:
     *         description: Solicitud inválida
     *       404:
     *         description: Activo no encontrado
     *     tags:
     *       - Assets
     */
    this.router.put(
      "/updateAsset/:id",
      [
        check("name", "Please include name").notEmpty(),
        check("description", "Please include a description").notEmpty(),
        check("category", "Please include a category").notEmpty(),
        check("assigned_employee"),
        check("assigned_date", ""),
        check("isDeleted", ""),
        validateFields,
        verifyJwt,
        verifyRoles(["admin", "user"]),
      ],
      AssetController.updateAsset
    );

    /**
     * @openapi
     * /asset/restoreAsset/{id}:
     *   put:
     *     summary: Restaurar un activo
     *     description: Restaura un activo previamente eliminado.
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del activo a restaurar
     *     responses:
     *       200:
     *         description: Activo restaurado exitosamente
     *       401:
     *         description: No autorizado
     *       404:
     *         description: Activo no encontrado
     *     tags:
     *       - Assets
     */
    this.router.put(
      "/restoreAsset/:id",
      [verifyJwt, verifyRoles(["admin"])],
      AssetController.restoreAsset
    );
  }
}

export default new AssetsRoutes().router;
