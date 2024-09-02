import mongoose from "mongoose";
import { Request } from "express";
import { Response } from "express";

import User from "../models/User";
import Asset from "../models/Asset";
import Category from "../models/Category";
import Employee from "../models/Employee";

import responseModel from "../helpers/response.model";

import IUser from "../interface/user.interface";

class AssetController {
  static async registerAsset(req: Request, res: Response) {
    const { name, description, category, assigned_employee, assigned_date } =
      req.body;

    console.log("entro");
    //TODO manejar con ids

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const existingAset = await Asset.findOne({ name }).session(session);

      if (existingAset) {
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
      console.log(
        "🚀 ~ AssetController ~ registerAsset ~ existingCategory:",
        existingCategory
      );

      console.log(existingCategory);

      if (!mongoose.Types.ObjectId.isValid(assigned_employee)) {
        return responseModel.fail(
          req,
          res,
          { message: "Invalid employee ID" },
          422
        );
      }
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

      //fecha

      const newAsset = new Asset({
        name,
        description,
        category: existingCategory._id,
        assigned_employee: existingEmployee._id,
        assigned_date: assigned_date,
      });

      await newAsset.save({ session: session });

      await session.commitTransaction();
      session.endSession();

      return responseModel.success(req, res, { message: "Asset created" }, 201);
    } catch (error) {
      console.log(error);
    }
  }
}
export default AssetController;
