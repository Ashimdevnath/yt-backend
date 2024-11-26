import express from "express";
import "dotenv/config";
import ConnectionFunction from "./db/index.js";

const app = express();

ConnectionFunction();

app.get("/", (req, res) => {
  res.send("Welcome to main page");
});

app.listen(process.env.PORT, (req, res) => {
  console.log("Server is running on port 3000");
});
