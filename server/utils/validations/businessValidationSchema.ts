import Joi from "joi";

export const businessRegistrationSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  name: Joi.string().required(),
});

export const businessWorkspaceSchema = Joi.object({
  domain: Joi.string().required(),
  businessName: Joi.string().required(),
});
