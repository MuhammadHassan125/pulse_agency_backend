import Joi from "joi";
import { handleError } from "../services/utils/responseUtils.js";
import { Validator } from "../middlewares/validator.js";

export const AddRoleValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    return Validator(req.body, res, next, schema);
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateRoleValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
    });

    return Validator(req.body, res, next, schema);
  } catch (error) {
    return handleError(res, error);
  }
};

export const AddComponentValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      page: Joi.string().required(),
      header: Joi.string().optional(),
      content: Joi.string().optional(),
      section: Joi.string().required(),
      file: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
        encoding: Joi.string().required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number()
          .max(5 * 1024 * 1024)
          .required(),
      }),
    });
    const { name, section, page, header, content } = req?.body;

    const body = { name, section, page, header, content, file: req?.file };

    return Validator(body, res, next, schema);
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateComponentValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      header: Joi.string().required(),
      content: Joi.string().required(),
    });

    return Validator(req.body, res, next, schema);
  } catch (error) {
    return handleError(res, error);
  }
};

export const AddPageValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    return Validator(req?.body, res, next, schema);
  } catch (error) {
    return handleError(res, error);
  }
};
export const updatePageValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
    });

    return Validator(req?.body, res, next, schema);
  } catch (error) {
    return handleError(res, error);
  }
};
