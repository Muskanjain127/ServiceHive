import { Schema, model } from "mongoose";
import { leadDoc } from "../interfaces/interface";
import { isEmail } from "validator";
const leadSchema = new Schema<leadDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: [isEmail, "please Fill a Valid Email"],
    },

    source: {
      type: String,
      enum: ["Website", "Instagram", "Referral"],
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const leads = model<leadDoc>("leads", leadSchema);
