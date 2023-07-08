import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserAuthInfoRequest extends Request {
  userId?: string;
}

interface JwtPayload {
  id: string;
}

export default (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const { id } = jwt.verify(token, "tokenkey") as JwtPayload;
      req.userId = id;

      next();
    } catch (error) {
      return res.status(403).json({
        msg: "No Access",
      });
    }
  } else {
    return res.status(403).json({
      msg: "No Access",
    });
  }
};
