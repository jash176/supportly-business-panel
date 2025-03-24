import Joi from "joi";

export const getWidgetSchema = Joi.object({
  apiKey: Joi.string().required(),
});
