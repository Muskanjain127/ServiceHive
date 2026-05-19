import { Request, Response } from "express";
import { leads } from "../../models/leads";
// delete lead
export const deleteLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedLead = await leads.findByIdAndDelete(id);

    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};
