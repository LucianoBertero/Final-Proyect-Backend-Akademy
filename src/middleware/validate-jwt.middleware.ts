import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import responseModel from "../helpers/response.model";
import { envs } from "../config/envs";

interface RequestWithUid extends Request {
  uid?: string;
}

export const verifyJwt = (
  req: RequestWithUid,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return responseModel.fail(
      req,
      res,
      { message: "No hay token en la petición" },
      401
    );
  }

  try {
    const secret = envs.JWT_SECRET || "mi_clave_secreta_predeterminada";

    const decoded = jwt.verify(token, secret) as { uid: string; role: string };

    if (!decoded.uid || typeof decoded.uid !== "string") {
      return responseModel.fail(req, res, { message: "Token inválido" }, 401);
    }

    req.uid = decoded.uid;
    req.role = decoded.role;

    next();
  } catch (err) {
    return responseModel.fail(req, res, { message: "Token inválido" }, 401);
  }
};
