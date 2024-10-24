import { model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { getEpochTime } from "../services/utils/commonUtils.js";

const users = new Schema({
  uid: { type: String, unique: true, default: uuidv4() },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  otp: { type: String, default: "" },
  status: { type: Boolean, default: true },
  roleId: { type: Schema.Types.ObjectId, ref: "roles", required: true },
  created_at: { type: Number, default: getEpochTime() },
});

const userRoles = new Schema({
  uid: { type: String, unique: true, default: uuidv4() },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  status: { type: Boolean, default: true },
});

const pages = new Schema({
  uid: { type: String, unique: true, default: uuidv4() },
  name: { type: String, required: true },
  status: { type: Boolean, default: true },
});
const components = new Schema({
  uid: { type: String, unique: true, default: uuidv4() },
  name: { type: String, required: true },
  section: { type: String, required: true },
  header: { type: String, default: "" },
  content: { type: String, default: "" },
  page: { type: Schema.Types.ObjectId, ref: "pages", required: true },
  pictures: { type: Array, default: [] },
  status: { type: Boolean, default: true },
});

export const userModel = model("users", users);
export const userRolesModel = model("roles", userRoles);
export const pagesModel = model("pages", pages);
export const componentsModel = model("components", components);
