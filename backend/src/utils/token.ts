import jwt from "jsonwebtoken";

export const genToken = (id: string, role: string): string => {
  return jwt.sign(
    { id, role }, 
    process.env.JWT_SECRET || "6a964f798c3541c5a796615b2f36422d227b5d13", 
    { expiresIn: "7d" }
  );
};