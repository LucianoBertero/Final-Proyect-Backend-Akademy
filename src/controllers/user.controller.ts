import mongoose from "mongoose";
import User from "../models/User";
import { Request } from "express";
import { Response } from "express";
import bcrypt from "bcrypt";
import responseModel from "../helpers/response.model";
import { Role } from "../models/Role";

class UserController {
  static async createUser(req: Request, res: Response) {
    const { name, email, password, role } = req.body;

    const normalizeEmail = email.toLowerCase();

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const existingUserByEmail = await User.findOne({
        email: normalizeEmail,
      }).session(session);
      if (existingUserByEmail) {
        await session.abortTransaction();
        session.endSession();

        return responseModel.fail(
          req,
          res,
          { message: "Email existente" },
          422
        );
      }

      const existingUserByName = await User.findOne({ name: name }).session(
        session
      );
      if (existingUserByName) {
        await session.abortTransaction();
        session.endSession();

        return responseModel.fail(
          req,
          res,
          { message: "Nombre de usuario existente" },
          422
        );
      }

      const existingRole = await Role.findOne({ name: role })
        .session(session)
        .exec();
      if (!existingRole) {
        await session.abortTransaction();
        session.endSession();

        return responseModel.fail(
          req,
          res,
          { message: "Rol no encontrado" },
          422
        );
      }

      const salt = bcrypt.genSaltSync();
      const newUser = new User({
        name: name,
        email: normalizeEmail,
        password: bcrypt.hashSync(password, salt),
        role: existingRole._id,
      });

      await newUser.save({ session });
      await session.commitTransaction();
      session.endSession();

      return responseModel.success(req, res, { newUser }, 201);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      return responseModel.fail(
        req,
        res,
        { message: "Error al registrar el usuario" },
        500
      );
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find().populate("role").exec();

      if (users.length === 0) {
        return responseModel.fail(req, res, { message: "No users found" }, 422);
      }

      return responseModel.success(req, res, { users }, 200);
    } catch (error) {
      return responseModel.fail(
        req,
        res,
        { message: "Error al obtener los usuarios" },
        500
      );
    }
  }
}

export default UserController;
