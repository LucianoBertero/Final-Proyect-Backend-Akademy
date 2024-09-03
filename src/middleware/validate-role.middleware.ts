import { Request, Response, NextFunction } from "express";
import responseModel from "../helpers/response.model";

const roles = {
  admin: "66d601e54c03989df60090b4",
  user: "66d601e54c03989df60090b5",
};

const verifyRoles = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const uid = req.uid;

    const roleId = req.role;

    if (!uid || !roleId) {
      return responseModel.fail(
        req,
        res,
        { message: "No se ha proporcionado UID o rol" },
        401
      );
    }

    try {
      const userRole = Object.keys(roles).find(
        (key) => roles[key as keyof typeof roles] === roleId
      );

      if (!userRole) {
        return responseModel.fail(
          req,
          res,
          { message: "Rol no encontrado" },
          403
        );
      }

      if (!allowedRoles.includes(userRole)) {
        return responseModel.fail(
          req,
          res,
          { message: "Acceso denegado" },
          403
        );
      }

      next();
    } catch (error) {
      console.log(error);
      return responseModel.fail(
        req,
        res,
        { message: "Error al verificar el rol" },
        500
      );
    }
  };
};

export default verifyRoles;
