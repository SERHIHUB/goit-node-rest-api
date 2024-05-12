import express from "express";
import auditAcces from "../middlewares/auditAcces.js";
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

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", auditAcces, deleteContact);

contactsRouter.post("/", jsonParcer, createContact);

contactsRouter.patch(
  "/:id/favorite",
  auditAcces,
  jsonParcer,
  updateStatusContact
);

contactsRouter.put("/:id", auditAcces, updateContact);

export default contactsRouter;
