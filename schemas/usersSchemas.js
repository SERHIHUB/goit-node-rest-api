import Joi from "Joi";

export const userRegisterSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const userLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

export default {
  userRegisterSchema,
  userLoginSchema,
};
