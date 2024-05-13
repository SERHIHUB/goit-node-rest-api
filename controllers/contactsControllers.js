import HttpError from "../helpers/HttpError.js";

import Contact from "../models/contact.js";

import {
  contactUpdateSchema,
  contactCreateSchema,
  contactFavoriteSchema,
} from "../schemas/contactsSchemas.js";

export async function getAllContacts(req, res, next) {
  try {
    const result = await Contact.find({ owner: req.user.id });

    res.send(result);
  } catch (error) {
    next(error);
  }
}

export async function getOneContact(req, res, next) {
  const { id } = req.params;
  try {
    const result = await Contact.findById(id);
    if (result === null) {
      throw HttpError(404);
    }

    if (result.owner.toString() !== req.user.id) {
      throw HttpError(404);
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteContact(req, res, next) {
  const { id } = req.params;

  try {
    const result = await Contact.findByIdAndDelete(id);
    if (result === null) {
      throw HttpError(404);
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
}

export async function createContact(req, res, next) {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    owner: req.user.id,
  };

  const { error } = contactCreateSchema.validate(contact);
  if (typeof error !== "undefined") {
    return res.status(400).send("Bad request");
  }

  try {
    const result = await Contact.create(contact);

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
}

export async function updateStatusContact(req, res, next) {
  const { _id } = req.params;

  const contact = {
    favorite: req.body.favorite,
  };

  const { error } = contactFavoriteSchema.validate(contact);

  if (typeof error !== "undefined") {
    return res.status(400).send("Bad request");
  }

  try {
    const result = await Contact.findOneAndUpdate(_id, contact, { new: true });

    if (result === null) {
      throw HttpError(404);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}

export async function updateContact(req, res, next) {
  const { _id } = req.params;

  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };

  const { error } = contactUpdateSchema.validate(contact);
  if (typeof error !== "undefined") {
    return res.status(400).send("Badd request");
  }

  try {
    const result = await Contact.findOneAndUpdate(_id, contact, { new: true });

    if (result === null) {
      throw HttpError(404);
    }
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}

export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateStatusContact,
  updateContact,
};
