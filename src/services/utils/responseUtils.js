import { logger } from "./logger.js";

export const handleAlreadyExists = (res, message = null) => {
  return res.status(422).json({
    status: false,
    message:
      message.length > 1
        ? `${message[0]} with this ${message[1]} Already Exists`
        : `${message} Already Exists`,
  });
};

export const handleUnauthorizedAccess = (res) => {
  return res.status(401).json({
    status: false,
    message: "Unauthorized Access",
  });
};
export const handleUnauthenticatedAccess = (res) => {
  return res.status(401).json({
    status: false,
    message: "Unauthenticated Access",
  });
};

export const handleSuccessResponse = (res, data = null, message = null) => {
  return res.status(200).json({
    status: true,
    data,
    message: message ?? "success",
  });
};

export const handleInvalidCredentials = (res, message = null) => {
  return res.status(401).json({
    status: false,
    error: !message ? "Invalid email or password" : `Invalid ${message}`,
  });
};

export const handleError = (res = null, error = null) => {
  console.log({ error });
  logger.error(error);
  return !res
    ? error?.body?.error ?? `${error}`
    : res.status(500).json({
        status: false,
        error: new Set(),
        message: "Something Went Wrong",
      });
};

export const handleValidationError = (res, error) => {
  let errorObj = new Set();

  errorObj[error.path] = error.message.replace(/"/gi, "");

  return res.status(422).json({
    status: false,
    error: errorObj,
  });
};

export const handleNotFound = (res, message = null) => {
  return res.status(404).json({
    status: false,
    message:
      message.length > 1
        ? `${message[0]} with this ${message[1]} not found`
        : `${message} not found`,
  });
};
