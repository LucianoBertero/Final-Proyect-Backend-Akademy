import mongoose from "mongoose";
import { Request, Response } from "express";

import Asset from "../models/Asset";
import Category from "../models/Category";
import Employee from "../models/Employee";

import responseModel from "../helpers/response.model";

class AssetController {
  static async registerAsset(req: Request, res: Response) {
    const { name, description, category, asigned_employee, asigned_date } =
      req.body;

    console.log(asigned_date);
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
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

      let employeeId = null;
      if (asigned_employee) {
        if (!mongoose.Types.ObjectId.isValid(asigned_employee)) {
          await session.abortTransaction();
          session.endSession();
          return responseModel.fail(
            req,
            res,
            { message: "Invalid employee ID" },
            422
          );
        }
        const existingEmployee = await Employee.findOne({
          _id: asigned_employee,
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

      let assignedDate = null;
      if (asigned_date) {
        assignedDate = new Date(asigned_date);
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

  static async getAssets(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10 } = req.query;
      let pageNumber = parseInt(page as string, 10);
      let limitNumber = parseInt(limit as string, 10);

      if (pageNumber < 1) pageNumber = 1;
      if (limitNumber < 1) limitNumber = 10;

      const skip = (pageNumber - 1) * limitNumber;

      const assets = await Asset.find()
        .populate("category")
        .populate("assigned_employee")
        .skip(skip)
        .limit(limitNumber);

      const totalAssets = await Asset.countDocuments();
      const totalPages = Math.ceil(totalAssets / limitNumber);

      if (assets.length === 0) {
        return responseModel.fail(
          req,
          res,
          { message: "No assets found" },
          404
        );
      }

      return responseModel.success(
        req,
        res,
        { assets, totalPages, currentPage: pageNumber, totalAssets },
        200
      );
    } catch (error) {
      console.log(error);
      return responseModel.fail(
        req,
        res,
        { message: "Error getting assets" },
        500
      );
    }
  }

  static async getAsset(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const assets = await Asset.findById(id)
        .populate("category")
        .populate("assigned_employee");

      if (!assets) {
        return responseModel.fail(
          req,
          res,
          { message: "No assets found" },
          404
        );
      }

      return responseModel.success(req, res, { assets }, 200);
    } catch (error) {
      console.log(error);
      return responseModel.fail(
        req,
        res,
        { message: "Error getting asset" },
        500
      );
    }
  }

  static async deletedAsset(req: Request, res: Response) {
    console.log("entro");
    const { id } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return responseModel.fail(
          req,
          res,
          { message: "Invalid Asset ID" },
          422
        );
      }

      const asset = await Asset.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );

      if (!asset) {
        return responseModel.fail(
          req,
          res,
          { message: "Asset not found" },
          404
        );
      }
      return responseModel.success(
        req,
        res,
        { message: "Asset deleted successfully" },
        200
      );
    } catch (error) {
      console.log(error);
      return responseModel.fail(
        req,
        res,
        { message: "Error getting assets" },
        500
      );
    }
  }

  static async updateAsset(req: Request, res: Response) {
    const { id } = req.params;
    const {
      name,
      description,
      category,
      assigned_employee,
      assigned_date,
      isDeleted,
    } = req.body;
    console.log(
      "🚀 ~ AssetController ~ updateAsset ~name",
      description,
      category,
      assigned_employee,
      assigned_date
    );

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return responseModel.fail(
          req,
          res,
          { message: "Invalid Asset ID" },
          422
        );
      }

      const existingAsset = await Asset.findOne({ name, _id: { $ne: id } });
      if (existingAsset) {
        return responseModel.fail(
          req,
          res,
          { message: "An asset with this name already exists" },
          409
        );
      }

      const updatedAsset = await Asset.findByIdAndUpdate(
        id,
        {
          name,
          description,
          category,
          assigned_employee,
          assigned_date,
          isDeleted,
        },
        { new: true, runValidators: true }
      );

      if (!updatedAsset) {
        return responseModel.fail(
          req,
          res,
          { message: "Asset not found" },
          404
        );
      }

      return responseModel.success(req, res, { updatedAsset }, 200);
    } catch (error) {
      return responseModel.fail(
        req,
        res,
        { message: "Error updating asset" },
        500
      );
    }
  }

  static async restoreAsset(req: Request, res: Response) {
    const { id } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return responseModel.fail(
          req,
          res,
          { message: "Invalid Asset ID" },
          422
        );
      }
      const asset = await Asset.findByIdAndUpdate(
        id,
        { isDeleted: false },
        { new: true }
      );

      if (!asset) {
        return responseModel.fail(
          req,
          res,
          { message: "Asset not found" },
          404
        );
      }

      return responseModel.success(
        req,
        res,
        { message: "Asset restored successfully", asset },
        200
      );
    } catch (error) {
      console.log(error);
      return responseModel.fail(
        req,
        res,
        { message: "Error restoring asset" },
        500
      );
    }
  }
}

export default AssetController;
