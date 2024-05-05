import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../middlewares/validateBody.js";
import contactSchema from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();
const jsonParcer = express.json();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post(
  "/",
  jsonParcer,
  validateBody(contactSchema),
  createContact
);

contactsRouter.patch(
  "/:id/favorite",
  jsonParcer,
  validateBody(contactSchema),
  updateStatusContact
);

export default contactsRouter;
