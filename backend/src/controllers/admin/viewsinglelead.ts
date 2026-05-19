import { Request, Response } from "express";
import { leads } from "../../models/leads";
// view single lead detail;
export const getLeadById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const lead = await leads.findById(id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res.status(200).json(lead);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};
