import { Request, Response } from "express";
import { user } from "../../models/user";
import { genToken } from "../../utils/token";
import bcrypt from "bcrypt";

// for register of user
export const register = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { name, email, password,role } = req.body;

    const isuser = await user.findOne({ email });
    if (isuser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Password hashing
    const passHash = await bcrypt.hash(password, 10);

    // creating new user
    const newUser = await user.create({
      name,
      email,
      passHash,
      role,
    });

    // Token generation
    const token = genToken(newUser._id.toString(), newUser.role);

    return res
      .status(201)
      .cookie("token", token)
      .json({
        message: "Registered Successfully",

        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something is wrong" });
  }
};
