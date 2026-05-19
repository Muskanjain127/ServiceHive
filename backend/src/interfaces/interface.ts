import { Document } from "mongoose";

//lead interface
export interface leadDoc extends Document {
  name: string;
  email: string;
  phone: string;
  status: "New" | "Contacted" | "Qualified" | "Lost";
  source: "Web" | "Social Media" | "Referral" | "Other";
  created_at: Date;
}
//user interface
export interface userInterface extends Document {
  name: string;
  email: string;
  passHash: string;
  role: "user" | "admin";
  createdAt: Date;
}
//token interface
export interface userData {
  id: string;
  role: "Admin" | "user";
}
