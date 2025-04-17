// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/route.js";

dotenv.config();

const app = express();
const port = process.env.PORT; // use the port from the environment variable or default to 5000

app.use(express.json()); // for parsing application/json (allows us to accept JSON data in the req.body)

app.use("/api/products", productRoutes); // use the product routes for all requests starting with /api/products

app.listen(port, () => {
    connectDB();
    console.log("Server is running on port http://localhost:"+ port);
});

