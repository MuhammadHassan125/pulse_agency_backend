import {
  handleError,
  handleValidationError,
} from "../services/utils/responseUtils.js";

export const Validator = (body, res, next, schema) => {
  try {
    const { error } = schema.validate(body);
    if (error) return handleValidationError(res, error?.details[0]);

    next();
  } catch (error) {
    return handleError(res, error);
  }
};
