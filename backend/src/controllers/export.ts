import { Request, Response } from "express";
import { leads } from "../models/leads";

export const exportLeadsToCSV = async (req: Request, res: Response) => {
  try {
    const { search, status, source } = req.query;
    let queryObj: any = {};

    if (search) {
      queryObj.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (status) queryObj.status = status;
    if (source) queryObj.source = source;

    const allLeadsData = await leads.find(queryObj).sort({ created_at: -1 });

    let csvContent = "Name,Email,Status,Source,Date Created\n";

    allLeadsData.forEach((lead: any) => {
      const name = lead.name.replace(/,/g, " ");
      const email = lead.email;
      const status = lead.status;
      const source = lead.source;
      const date = lead.created_at
        ? new Date(lead.created_at).toISOString().split("T")[0]
        : "N/A";

      csvContent += `${name},${email},${status},${source},${date}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=leads_export.csv",
    );

    return res.status(200).send(csvContent);
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
