import Joi from "joi";

export const createTriggerValidation = Joi.object({
  triggerName: Joi.string().required(),
  triggerIdentifier: Joi.string().required(),
  action: Joi.string().valid("show_message", "open_chatbox").required(),
  message: Joi.string().required(),
  condition: Joi.string()
    .valid("leave_intent", "click_link", "on_page")
    .required(),
  conditionValue: Joi.string().required(),
  delaySeconds: Joi.number().required(),
  behaviorExecuteIfOnline: Joi.boolean().required(),
  behaviorExecuteIfNoOtherTrigger: Joi.boolean().required(),
});
