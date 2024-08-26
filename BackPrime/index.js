import express, { json } from "express";
import dotenv from "dotenv";
import connectDB from "./Config/DB.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import categorieRouters from "./routes/categorieRoutes.js";
import whitelistRoutes from "./routes/whitelistRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
connectDB();
app.use(cors({ credentials: false, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/auth/discord", userRoutes);
app.use("/categorie", categorieRouters);
app.use("/whitelist", whitelistRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("server is running on port ", port);
});
