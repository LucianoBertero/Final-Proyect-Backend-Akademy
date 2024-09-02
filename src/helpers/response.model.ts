import { Request, Response } from "express";
class Responses {
  public fail(req: Request, res: Response, data: any, status = 400) {
    const body = {
      ok: false,
      ...data,
    };
    res.status(status).json(body);
  }

  public success(req: Request, res: Response, data: any, status = 200) {
    const body = {
      ok: true,
      ...data,
    };
    res.status(status).json(body);
  }
}

export default new Responses();
