import { DEFAULT_ROLES } from "../config/configurations.js";
import {
  componentsModel,
  pagesModel,
  userModel,
  userRolesModel,
} from "../database/models.js";
import {
  deleteRecord,
  insertSingle,
  readMultiple,
  readSingle,
  updateSingle,
} from "../database/query.js";

import { encryptPassword } from "../services/utils/commonUtils.js";

import {
  handleAlreadyExists,
  handleNotFound,
  handleSuccessResponse,
  handleUnauthorizedAccess,
} from "../services/utils/responseUtils.js";

import fs from "fs";

export const addRole = async (req, res) => {
  const { name } = req?.body;

  let role = await readSingle(userRolesModel, { name });

  if (role) return handleAlreadyExists(res, ["role", "name"]);

  const slug = name?.trim()?.toLowerCase()?.replace(/\s+/g, "_");

  const data = { name, slug };

  role = await insertSingle(userRolesModel, data);

  return handleSuccessResponse(res);
};

export const readRoleById = async (req, res) => {
  const { id } = req?.params;

  const role = await readSingle(userRolesModel, { _id: id });

  return handleSuccessResponse(res, { role });
};

export const readRoles = async (req, res) => {
  const roles = await readMultiple(userRolesModel);

  return handleSuccessResponse(res, { roles });
};

export const updateRole = async (req, res) => {
  const { id, name } = req?.body;

  let role = await readSingle(userRolesModel, { _id: id });

  if (!role) return handleNotFound(res, ["role", "id"]);

  const slug = name?.trim()?.toLowerCase()?.replace(/\s+/g, "_");

  const data = { name, slug };

  role = await updateSingle(userRolesModel, { _id: id }, data);

  return handleSuccessResponse(res);
};

export const deleteRole = async (req, res) => {
  const { id } = req?.params;

  const role = await readSingle(userRolesModel, { _id: id });

  if (!role) return handleNotFound(res, ["role", "id"]);

  await deleteRecord(userRolesModel, { _id: id });

  return handleSuccessResponse(res);
};

export const addComponent = async (req, res) => {
  let pictures = new Array();

  let { name, header, content, page, section } = req?.body;

  const component = await readSingle(componentsModel, { name });

  if (component) return handleAlreadyExists(res, ["component", "name"]);

  if (req.files) {
    req.files.map((file, i) => {
      let { filename, mimetype } = file;

      const fileName = `${name?.trim()?.toLowerCase()?.replace(/\s+/g, "_")}_${
        i + 1
      }.${mimetype.split("/")[1]}`;

      filename = `src/uploads/components/${filename}`;

      if (fs.existsSync(filename))
        fs.rename(filename, `src/uploads/components/${fileName}`, (err) => {});

      pictures.push(fileName);
    });
  }

  page = await readSingle(pagesModel, { _id: page });

  if (!page) return handleNotFound(res, ["page", "id"]);

  let data = {
    name,
    header,
    section,
    content,
    page,
    pictures,
    page,
  };
  await insertSingle(componentsModel, data);

  return handleSuccessResponse(res, { data });
};

export const readComponentById = async (req, res) => {
  const { id } = req?.params;

  let component = await readSingle(componentsModel, { _id: id });

  if (!component) return handleNotFound(res, ["component", "id"]);

  return handleSuccessResponse(res, { component });
};

export const readComponents = async (req, res) => {
  const { page, section } = req?.query;

  let readFilter = {};

  if (section) readFilter = { section };

  if (page) readFilter = { page };

  const components = await readMultiple(componentsModel, readFilter);

  return handleSuccessResponse(res, { components });
};

export const updateComponent = async (req, res) => {
  const { id, name, header, content } = req.body;

  let component = await readSingle(componentsModel, { _id: id });

  if (!component) return handleNotFound(res, ["component", "id"]);

  await updateSingle(componentsModel, { _id: id }, { name, header, content });

  return handleSuccessResponse(res);
};

export const deleteComponent = async (req, res) => {
  const { id } = req?.params;

  const component = await readSingle(componentsModel, { _id: id });

  if (!component) return handleNotFound(res, ["component", "id"]);

  await deleteRecord(componentsModel, { _id: id });

  return handleSuccessResponse(res);
};

export const AddPage = async (req, res) => {
  const { name } = req?.body;

  const slug = name?.trim()?.toLowerCase()?.replace(/\s+/g, "_");

  const page = await readSingle(pagesModel, { name });

  if (page) return handleAlreadyExists(res, ["page", "name"]);

  await insertSingle(pagesModel, { name, slug });

  return handleSuccessResponse(res);
};

export const readPageById = async (req, res) => {
  const { id } = req?.params;

  const page = await readSingle(pagesModel, { _id: id });

  if (!page) return handleNotFound(res, ["page", "id"]);

  return handleSuccessResponse(res, { page });
};

export const readPages = async (req, res) => {
  const { page } = req?.query;
  const pages = await readMultiple(pagesModel, page ? { page } : null);

  return handleSuccessResponse(res, { pages });
};

export const updatePage = async (req, res) => {
  const { id, name } = req.body;

  const slug = name?.trim()?.toLowerCase()?.replace(/\s+/g, "_");

  let page = await readSingle(pagesModel, { _id: id });

  if (!page) return handleNotFound(res, ["page", "id"]);

  await updateSingle(pagesModel, { _id: id }, { name, slug });

  return handleSuccessResponse(res);
};

export const deletePage = async (req, res) => {
  const { id } = req?.params;

  const page = await readSingle(pagesModel, { _id: id });

  if (!page) return handleNotFound(res, ["page", "id"]);

  await deleteRecord(pagesModel, { _id: id });

  return handleSuccessResponse(res);
};

export const addUser = async (req, res) => {
  let superAdmin = DEFAULT_ROLES;

  superAdmin = superAdmin
    .replace(/[\[\]]/g, "")
    .split(",")
    .map((role) => role.trim())[1];

  let { name, email, password, role } = req?.body;

  email = email?.trim()?.toLowerCase();

  password = await encryptPassword(password);

  const user = await readSingle(userModel, { email });

  if (user) return handleAlreadyExists(res, ["User", "Email"]);

  role = await readSingle(userRolesModel, { _id: role });

  if (!role) return handleNotFound(res, ["role", "id"]);

  if (role?.name == superAdmin) return handleUnauthorizedAccess(res);

  const data = {
    name,
    email,
    password,
    roleId: role._id,
  };

  await insertSingle(userModel, data);

  return handleSuccessResponse(res);
};

export const readUserById = async (req, res) => {
  const { id } = req?.params;

  let user = await readSingle(userModel, { _id: id });
  delete user.password;

  return handleSuccessResponse(res, { user });
};

export const readUsers = async (req, res) => {
  let users = await readMultiple(userModel);

  users = users?.map((user) => {
    const { _id, uid, email, name, otp, status, roleId } = user;
    return (user = {
      _id,
      uid,
      email,
      name,
      otp,
      status,
      roleId,
    });
  });

  return handleSuccessResponse(res, { users });
};

export const updateUser = async (req, res) => {
  let { id, name, role } = req?.body;

  const user = await readSingle(userModel, { _id: id });

  if (!user) return handleNotFound(res, ["user", "id"]);

  const data = { name, roleId: role };

  if (role) {
    role = await readSingle(userRolesModel, { _id: role });
    if (!role) return handleNotFound(res, ["role", "id"]);
  }
  await updateSingle(userModel, { _id: id }, data);

  return handleSuccessResponse(res);
};

export const deleteUser = async (req, res) => {
  const { id } = req?.params;

  const user = await readSingle(userModel, { _id: id });

  if (!user) return handleNotFound(res, ["user", "id"]);

  await deleteRecord(userModel, { _id: id });

  return handleSuccessResponse(res);
};
