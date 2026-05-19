import mongoose from "mongoose";
export async function connectdb(): Promise<void> {
  try {
    const dbUrl = process.env.Mongo_url;
    console.log(dbUrl);
    if (!dbUrl) {
      throw new Error("Mongodb_URL is not defined in environment variables");
    }

    await mongoose.connect(dbUrl);
    console.log(" mongodb connected successfully");
  } catch (err) {
    if (err instanceof Error) {
      console.error(" database connection error:", err.message);
    } else {
      console.error(" an unknown database error occurred:", err);
    }
    process.exit(1);
  }
}