import { Router } from "express";
import {
  login,
  resetPassword,
  sendOtp,
  signupUser,
  verifyOtp,
} from "./controllers.js";

import {
  forgetPasswordValidation,
  loginValidation,
  resetPasswordValidation,
  signUpValidation,
  verifyOtpValidation,
} from "./validations.js";

import { errorHandler } from "../middlewares/errorHandler.js";

export const GeneralRoute = Router();

GeneralRoute.post("/sign-up", signUpValidation, errorHandler(signupUser))

  .post("/login", loginValidation, errorHandler(login))

  .post("/otp/send", forgetPasswordValidation, errorHandler(sendOtp))

  .post("/otp/verify", verifyOtpValidation, errorHandler(verifyOtp))

  .post(
    "/password/reset",
    resetPasswordValidation,
    errorHandler(resetPassword)
  );
