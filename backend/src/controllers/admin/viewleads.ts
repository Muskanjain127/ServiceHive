import { Request, Response } from "express";
import { leads } from "../../models/leads";

// view lead list
export const getAllLeads = async (req: Request, res: Response) => {
  try {
    const { status, source, search, sortBy, page } = req.query;

    let queryObj: { [key: string]: any } = {};
    if (status) {
      queryObj.status = status as string;
    }

    if (source) {
      queryObj.source = source as string;
    }

    if (search) {
      const searchString = search as string;
      queryObj.$or = [
        { name: { $regex: searchString, $options: "i" } },
        { email: { $regex: searchString, $options: "i" } },
      ];
    }

    let sortObj: { [key: string]: 1 | -1 } = { created_at: -1 };
    if (sortBy === "oldest") {
      sortObj = { created_at: 1 };
    }

    // PAGINATION LOGIC
    const p = Number(page) || 1;
    const l = 10;
    const skipValue = (p - 1) * l;

    const allleads = await leads
      .find(queryObj)
      .sort(sortObj)
      .skip(skipValue)
      .limit(l);
    const totalLeads = await leads.countDocuments(queryObj);
    return res.status(200).json({
      success: true,
      currentPage: p,
      totalPages: Math.ceil(totalLeads / l),
      totalLeads,
      data: allleads,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};
