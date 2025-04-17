// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/route.js";

dotenv.config();

const app = express();

app.use(express.json()); // for parsing application/json (allows us to accept JSON data in the req.body)

app.use("/api/products", productRoutes);

console.log(process.env.MONGO_URI);

app.listen(5000, () => {
    connectDB();
    console.log("Server is running on port http://localhost:5000");
});

