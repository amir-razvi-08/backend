import dotenv from "dotenv";
import connectDB from "./database/mongoDB.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

connectDB()
    .then(() => {
        console.log("MongoDB Connected Successfully!");
    })
    .catch((err) => {
        console.error("MongoDB connection FAILED!", err);
    });

export default app;
