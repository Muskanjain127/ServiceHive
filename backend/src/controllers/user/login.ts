import { Request, Response } from "express";
import { user } from "../../models/user";
import { genToken } from "../../utils/token";
import bcrypt from "bcrypt";



// login user
export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const isUser = await user.findOne({ email });
    if (!isUser) {
      return res.status(400).json({ message: "Email or Password is wrong" });
    }
    const isPassCorr = await bcrypt.compare(password, isUser.passHash);
    if (!isPassCorr) {
      return res.status(400).json({ message: "Email or Password is wrong" });
    }
    const token = genToken(isUser._id.toString(), isUser.role);

    return res
      .status(200)
      .cookie("token", token) // Cookies add ho gayi
      .json({
        message: "Login successfully",

        user: {
          id: isUser._id,
          name: isUser.name,
          email: isUser.email,
          role: isUser.role,
        },
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server errorr" });
  }
};
