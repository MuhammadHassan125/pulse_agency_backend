import jwt from "jsonwebtoken";

import {
  handleError,
  handleUnauthorizedAccess,
} from "../services/utils/responseUtils.js";

import { JWT_SECRET } from "../../src/config/configurations.js";

import { userModel } from "../database/models.js";

import { readSingle } from "../database/query.js";

export const authenticate = async (req, res, next, role = null) => {
  try {
    const { authorization } = req?.headers;

    const token = authorization && authorization?.split(" ")[1];

    if (!token) return handleUnauthorizedAccess(res);

    const verifiedToken = jwt?.verify(token, JWT_SECRET);

    if (!verifiedToken) return handleUnauthorizedAccess(res);

    req.user = await readSingle(userModel, { _id: verifiedToken?.id });

    if (role && verifiedToken?.role != role)
      return handleUnauthorizedAccess(res);

    if (!req?.user) return handleUnauthorizedAccess(res);

    next();
  } catch (error) {
    error = error?.message ?? error;

    return error == "invalid token" || error == "jwt malformed"
      ? handleUnauthorizedAccess(res)
      : handleError(res, error);
  }
};
