import Joi from "joi";

export const sendMessageSchema = Joi.object({
  businessId: Joi.string().required(),
  customerEmail: Joi.string(),
  sessionId: Joi.string(),
  sender: Joi.string().valid("customer", "business").required(),
  senderId: Joi.string(),
  contentType: Joi.string().valid("text", "image", "audio").required(),
  content: Joi.string(),
});

export const fetchMessagesByEmailSchema = Joi.object({
  sessionId: Joi.string().required(),
});

export const messageIdsSchema = Joi.object({
  messageIds: Joi.string()
    .pattern(/^\d+(,\d+)*$/)
    .required()
    .messages({
      "string.pattern.base":
        "messageIds must be a comma-separated list of numbers.",
      "any.required": "messageIds is required.",
    }),
});

export const updateUserEmailSchema = Joi.object({
  customerEmail: Joi.string().required(),
  sessionId: Joi.string().required(),
});

export const createShortcutSchema = Joi.object({
  shortcut: Joi.string().required(),
  message: Joi.string().required(),
})