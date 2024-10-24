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
  header: { type: String, required: true },
  content: { type: String, required: true },
  page: { type: Schema.Types.ObjectId, ref: "pages", required: true },
  pictures: { type: Array, default: [] },
  status: { type: Boolean, default: true },
});

export const userModel = model("users", users);
export const userRolesModel = model("roles", userRoles);
export const pagesModel = model("pages", pages);
export const componentsModel = model("components", components);

// const mongoose = require("mongoose");
// const CMSPage = require("./CMSPage"); // Assuming CMSPage is another model in the same directory
// const CMSStructure = require("./CMSStructure"); // Assuming CMSStructure is another model in the same directory
// const constants = require("../generic/services/utils/constants"); // Replace with the correct path for constants

// // Define CMSComponent schema
// const CMSComponentSchema = new mongoose.Schema({
//   page: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "CMSPage", // Reference to CMSPage model
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   slug: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: Map,
//     of: mongoose.Schema.Types.Mixed,
//     default: {},
//   },
//   structure: {
//     type: mongoose.Schema.Types.Mixed, // You can replace it with a proper schema for CMSStructure if needed
//     required: true,
//   },
// });

// // Create the model
// const CMSComponent = mongoose.model("CMSComponent", CMSComponentSchema);

// module.exports = CMSComponent;
