import express from "express";
import auditToken from "../middlewares/auditToken.js";
import {
  registerUser,
  loginUser,
  logout,
  currentUser,
  usersAvatar,
} from "../controllers/authControllers.js";

import upload from "../middlewares/upload.js";

const authRouter = express.Router();
const jsonParcer = express.json();

authRouter.post("/register", jsonParcer, registerUser);

authRouter.post("/login", jsonParcer, loginUser);

authRouter.post("/logout", auditToken, logout);

authRouter.get("/current", auditToken, jsonParcer, currentUser);

authRouter.patch(
  "/avatars",
  upload.single("avatarka"),
  auditToken,
  usersAvatar
);

export default authRouter;
