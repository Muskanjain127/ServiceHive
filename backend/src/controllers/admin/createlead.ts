import { Request, Response } from "express";
import { leads } from "../../models/leads";

// create lead
export const createLead = async (req: Request, res: Response) => {
  try {
    const { name, email, status, source } = req.body;

    if (!name || !email || !status || !source) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newLead = await leads.create({ name, email, status, source });
    return res
      .status(201)
      .json({ message: "Lead created successfully", lead: newLead });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};
