import { Request, Response } from "express";
import { leads } from "../../models/leads";
//update lead
export const updateLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, status, source } = req.body;

    const updatedLead = await leads.findByIdAndUpdate(
      id,
      { name, email, status, source },
      { new: true, runValidators: true },
    );

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res
      .status(200)
      .json({ message: "Lead updated successfully", lead: updatedLead });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};
export const findlead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const findlead = await leads.findById(id);

    if (!findlead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res
      .status(200)
      .json({ message: "Lead updated successfully", lead: findlead });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};
