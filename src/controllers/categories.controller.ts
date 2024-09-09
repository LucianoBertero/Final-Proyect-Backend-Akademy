import mongoose from "mongoose";
import Category from "../models/Category";

import { Request } from "express";
import { Response } from "express";
import responseModel from "../helpers/response.model";

class CategoriesController {
  static async getCategories(req: Request, res: Response) {
    try {
      const categories = await Category.find().exec();

      if (!categories) {
        return responseModel.fail(
          req,
          res,
          { message: "No hay categorias" },
          400
        );
      }

      return responseModel.success(req, res, { categories });
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
export default CategoriesController;
