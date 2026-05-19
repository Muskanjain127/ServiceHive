import { Router } from "express";
import { createLead } from "../controllers/admin/createlead";
import { deleteLead } from "../controllers/admin/dletelead";
import { findlead, updateLead } from "../controllers/admin/updatelead";
import { getAllLeads } from "../controllers/admin/viewleads";
import { isValid, checkRole } from "../middleware/auth";
import { exportLeadsToCSV } from "../controllers/export";
const adminrouter = Router();

// admin routes
adminrouter.post("/create", isValid, checkRole("Admin"), createLead);
adminrouter.delete("/delete/:id", isValid, checkRole("Admin"), deleteLead);
adminrouter.get("/allleads", isValid, checkRole("Admin"), getAllLeads);
adminrouter.get("/lead/:id", isValid, checkRole("Admin"), findlead);
adminrouter.get("/export", isValid, checkRole("Admin"), exportLeadsToCSV);

adminrouter.post("/update/:id", isValid, checkRole("Admin"), updateLead);
export default adminrouter;
