import mongoose from "mongoose";
import { Request, Response } from "express";

import Asset from "../models/Asset";
import Category from "../models/Category";
import Employee from "../models/Employee";

import responseModel from "../helpers/response.model";

class AssetController {
  static async registerAsset(req: Request, res: Response) {
    const { name, description, category, assigned_employee, assigned_date } =
      req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Verificar si el activo ya existe
      const existingAsset = await Asset.findOne({ name }).session(session);
      if (existingAsset) {
        await session.abortTransaction();
        session.endSession();
        return responseModel.fail(
          req,
          res,
          { message: "Asset already exists" },
          422
        );
      }

      // Validar y obtener la categoría
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return responseModel.fail(
          req,
          res,
          { message: "Invalid category ID" },
          422
        );
      }
      const existingCategory = await Category.findOne({
        _id: category,
      }).session(session);
      if (!existingCategory) {
        await session.abortTransaction();
        session.endSession();
        return responseModel.fail(
          req,
          res,
          { message: "Category not found" },
          422
        );
      }

      // Validar y obtener el empleado asignado (si se proporciona)
      let employeeId = null;
      if (assigned_employee) {
        if (!mongoose.Types.ObjectId.isValid(assigned_employee)) {
          return responseModel.fail(
            req,
            res,
            { message: "Invalid employee ID" },
            422
          );
        }
        const existingEmployee = await Employee.findOne({
          _id: assigned_employee,
        }).session(session);
        if (!existingEmployee) {
          await session.abortTransaction();
          session.endSession();
          return responseModel.fail(
            req,
            res,
            { message: "Employee not found" },
            422
          );
        }
        employeeId = existingEmployee._id;
      }

      // Manejo de la fecha asignada (si se proporciona)
      let assignedDate = null;
      if (assigned_date) {
        assignedDate = new Date(assigned_date);
        if (isNaN(assignedDate.getTime())) {
          return responseModel.fail(
            req,
            res,
            { message: "Invalid date format" },
            422
          );
        }
      }

      // Crear y guardar el nuevo activo
      const newAsset = new Asset({
        name,
        description,
        category: existingCategory._id,
        assigned_employee: employeeId,
        assigned_date: assignedDate,
      });

      await newAsset.save({ session: session });
      await session.commitTransaction();
      session.endSession();

      return responseModel.success(req, res, { message: "Asset created" }, 201);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return responseModel.fail(
        req,
        res,
        { message: "Error al registrar el activo" },
        500
      );
    }
  }
}

export default AssetController;
