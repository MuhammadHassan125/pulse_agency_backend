import { handleError } from "../services/utils/responseUtils.js";

export const errorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((error) => {
      return handleError(res, error);
    });
  };
};
