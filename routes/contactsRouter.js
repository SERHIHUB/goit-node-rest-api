import express from "express";
import auditAcces from "../middlewares/auditAcces.js";
import auditToken from "../middlewares/auditToken.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateStatusContact,
  updateContact,
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();
const jsonParcer = express.json();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", auditAcces, getOneContact);

contactsRouter.delete("/:id", auditAcces, deleteContact);

contactsRouter.post("/", jsonParcer, auditToken, createContact);

contactsRouter.patch(
  "/:id/favorite",
  auditAcces,
  jsonParcer,
  updateStatusContact
);

contactsRouter.put("/:id", auditAcces, updateContact);

export default contactsRouter;
