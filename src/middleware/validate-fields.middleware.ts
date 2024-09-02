import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const validateFields = (req: Request, res: Response, next: NextFunction) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.json({
      ok: false,
      message: "Errors",
      errors: { fields: errores.mapped() },
    });
  }
  next();
};

export default validateFields;
