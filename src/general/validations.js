import Joi from "joi";
import { handleError } from "../services/utils/responseUtils.js";
import { Validator } from "../middlewares/validator.js";

export const loginValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    return Validator(req.body, res, next, schema);
  } catch (error) {
    return handleError(res, error);
  }
};

export const signUpValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    return Validator(req.body, res, next, schema);
  } catch (error) {
    return handleError(res, error);
  }
};

export const forgetPasswordValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    return Validator(req.body, res, next, schema);
  } catch (error) {
    return handleError(res, error);
  }
};

export const verifyOtpValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      otp: Joi.string().required(),
    });

    return Validator(req.body, res, next, schema);
  } catch (error) {
    return handleError(res, error);
  }
};

export const resetPasswordValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    return Validator(req.body, res, next, schema);
  } catch (error) {
    return handleError(res, error);
  }
};
