import { Schema, model } from "mongoose";
import { userInterface } from "../interfaces/interface";
import isEmail from "validator/lib/isEmail";

const userSchema = new Schema<userInterface>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [isEmail, "please Fill a Valid Email"],
    },
    passHash: { type: String, required: true },
    role: { type: String, enum: ["user", "Admin"] },
  },
  { timestamps: true },
);

export const user = model<userInterface>("user", userSchema);
