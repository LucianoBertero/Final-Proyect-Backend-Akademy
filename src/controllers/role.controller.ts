import { Role } from "./../models/Role";
import mongoose from "mongoose";

import { Request } from "express";
import { Response } from "express";
import responseModel from "../helpers/response.model";

class RoleController {
  static async getRoles(req: Request, res: Response) {
    try {
      const roles = await Role.find().exec();

      if (!roles) {
        return responseModel.fail(req, res, { message: "No hay roles" }, 400);
      }

      return responseModel.success(req, res, { roles });
    } catch (error) {
      return responseModel.fail(
        req,
        res,
        { message: "Error en el servidor" },
        500
      );
    }
  }
}
export default RoleController;
