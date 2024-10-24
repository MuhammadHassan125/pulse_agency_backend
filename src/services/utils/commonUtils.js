import { compare, genSalt, hashSync } from "bcrypt";
import JWT from "jsonwebtoken";

import nodemailer from "nodemailer";
import {
  EMAIL_CONFIG,
  JWT_SECRET,
  OTP_LENGTH,
} from "../../../src/config/configurations.js";

export const generateJWTToken = (DATA) => {
  return JWT.sign(DATA, JWT_SECRET);
};

export const encryptPassword = async (password) => {
  return hashSync(password, await genSalt(10));
};

export const comparePassword = async (password, encryptedPassword) => {
  return await compare(password, encryptedPassword);
};

export const sendEmail = async (to, subject, html) => {
  try {
    const { user, pass } = EMAIL_CONFIG;

    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      require: true,
      auth: {
        user,
        pass,
      },
    });

    var mailOptions = {
      from: `Pulse Marketing ${user}`,
      to,
      subject,
      html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      return error
        ? console.error({ error })
        : `Mail has been sent successfully to: ${to}`;
    });

    return `Mail has been sent successfully to: ${to}`;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getEpochTime = () => {
  return Math.trunc(Date.now() / 1000);
};

export const generateOTP = () => {
  const min = Math.pow(10, OTP_LENGTH - 1);
  const max = Math.pow(10, OTP_LENGTH) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
