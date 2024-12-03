import { insertSingle, readSingle, updateSingle } from "../database/query.js";
import {
  comparePassword,
  encryptPassword,
  generateJWTToken,
  generateOTP,
  sendEmail,
} from "../services/utils/commonUtils.js";

import {
  handleAlreadyExists,
  handleInvalidCredentials,
  handleNotFound,
  handleSuccessResponse,
} from "../services/utils/responseUtils.js";

import ejs from "ejs";
import fs from "fs";
import { userModel, userRolesModel } from "../database/models.js";

export const signupUser = async (req, res) => {
  let { name, email, password } = req?.body;

  email = email?.trim()?.toLowerCase();

  password = await encryptPassword(password);

  let user = await readSingle(userModel, { email });

  if (user) return handleAlreadyExists(res, ["User", "Email"]);

  const role = await readSingle(userRolesModel, { name: "User" });
  console.log(role, 'fffffffffffffffffffffff')

  let data = {
    name,
    email,
    password,
    roleId: role,
  };

  user = await insertSingle(userModel, data);

  return handleSuccessResponse(res);
};

export const login = async (req, res) => {
  let { email, password } = req?.body;

  email = email?.trim()?.toLowerCase();

  const user = await readSingle(userModel, { email });

  if (!user) return handleInvalidCredentials(res);

  if (!(await comparePassword(password, user?.password)))
    return handleInvalidCredentials(res);

  const { slug } = await readSingle(userRolesModel, { _id: user.roleId });

  const { _id } = user;

  const data = { id: _id, email, role: slug };

  const token = generateJWTToken(data);

  return handleSuccessResponse(res, { token });
};

export const sendOtp = async (req, res) => {
  const { email } = req?.body;

  const user = await readSingle(userModel, { email });

  if (!user) return handleNotFound(res, ["user", "email"]);

  const otp = generateOTP();

  await updateSingle(userModel, { email }, { otp });

  const path = `src/services/templates/forgetPassword.ejs`;

  const body = ejs.render(fs.readFileSync(path, "utf-8"), { otp });

  const message = await sendEmail(email, "RESET PASSWORD", body);

  return handleSuccessResponse(res, null, message);
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  let user = await readSingle(userModel, { email, otp });

  if (!user) return handleInvalidCredentials(res, "otp");

  await updateSingle(userModel, { email }, { otp: null });

  return handleSuccessResponse(res);
};

export const resetPassword = async (req, res) => {
  let { email, password } = req?.body;

  const user = await readSingle(userModel, { email });

  if (!user) return handleNotFound(res, ["user"]);

  password = await encryptPassword(password);

  await updateSingle(userModel, { email }, { password });

  return handleSuccessResponse(res);
};
