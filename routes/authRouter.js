import express from "express";
import auditToken from "../middlewares/auditToken.js";
import {
  registerUser,
  loginUser,
  logout,
  currentUser,
} from "../controllers/authControllers.js";

const authRouter = express.Router();
const jsonParcer = express.json();

authRouter.post("/register", jsonParcer, registerUser);

authRouter.post("/login", jsonParcer, loginUser);

authRouter.post("/logout", auditToken, logout);

authRouter.get("/current", auditToken, jsonParcer, currentUser);

export default authRouter;
