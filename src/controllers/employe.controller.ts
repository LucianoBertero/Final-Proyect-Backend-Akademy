import mongoose from "mongoose";
import Employee from "../models/Employee";

import { Request } from "express";
import { Response } from "express";
import responseModel from "../helpers/response.model";

class EmployeeController {
  static async getEmployees(req: Request, res: Response) {
    try {
      const employee = await Employee.find().exec();

      if (!employee) {
        return responseModel.fail(
          req,
          res,
          { message: "No hay empleados" },
          400
        );
      }

      return responseModel.success(req, res, { employee });
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
export default EmployeeController;
