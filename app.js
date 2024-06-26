import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "node:path";

import "./db.js";

import routers from "./routes/index.js";

const app = express();

app.use("/avatars", express.static(path.resolve("public/avatars")));

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/", routers);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000);
