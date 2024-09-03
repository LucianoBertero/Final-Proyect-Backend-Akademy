import mongoose from "mongoose";
import User from "../models/User";

import { Request } from "express";
import { Response } from "express";
import bcrypt from "bcrypt";
import responseModel from "../helpers/response.model";
import { generateJWT } from "../helpers/generate-jwt";
import { Role } from "../models/Role";
import IUser from "../interface/user.interface";

class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = (await User.findOne({
        email: email,
      })) as IUser & Document;

      if (!user) {
        return responseModel.fail(
          req,
          res,
          { message: "Email o contraseña incorrectos" },
          400
        );
      }
      //usuario con contra validada
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return responseModel.fail(
          req,
          res,
          { message: "Email o contraseña incorrectos" },
          400
        );
      }
      console.log(user);

      const token = await generateJWT(user.id.toString(), user.role.toString());

      return responseModel.success(req, res, { user, token });
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
export default AuthController;
