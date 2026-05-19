import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userData } from "../interfaces/interface";

export interface myReq extends Request {
  user?: userData;
}
export const isValid = (req: myReq, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "first please login" });
  }

  try {
    const tokenData = jwt.verify(
      token,
      process.env.JWT_SECRET || "6a964f798c3541c5a796615b2f36422d227b5d13",
    ) as userData;

    req.user = tokenData;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const checkRole = (...roles: ("Admin" | "user")[]) => {
  return (req: myReq, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    // 1. Agar token cookies me h hi nahi, toh pehle hi rok do
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const tokenData = jwt.verify(
        token,
        process.env.JWT_SECRET || "6a964f798c3541c5a796615b2f36422d227b5d13",
      ) as userData;

      req.user = tokenData;
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
