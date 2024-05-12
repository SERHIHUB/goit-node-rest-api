import express from "express";

import authRouter from "./authRouter.js";
import contactsRouter from "./contactsRouter.js";
import auditToken from "../middlewares/auditToken.js";

const routers = express.Router();

routers.use("/users", authRouter);
routers.use("/api/contacts", auditToken, contactsRouter);

export default routers;
