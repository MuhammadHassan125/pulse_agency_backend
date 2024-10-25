import { Router } from "express";
import {
  addComponent,
  AddPage,
  addRole,
  addUser,
  deleteComponent,
  deletePage,
  deleteRole,
  deleteUser,
  readComponentById,
  readComponents,
  readPageById,
  readPages,
  readRoleById,
  readRoles,
  readUserById,
  readUsers,
  updateComponent,
  updatePage,
  updateRole,
  updateUser,
} from "./controllers.js";

import {
  AddComponentValidation,
  AddPageValidation,
  AddRoleValidation,
  addUserValidation,
  updateComponentValidation,
  updatePageValidation,
  updateRoleValidation,
  updateUserValidation,
} from "./validations.js";

import { errorHandler } from "../middlewares/errorHandler.js";

import { authenticate } from "../middlewares/auth.js";
import { Multer } from "../middlewares/Multer.js";

export const Admin = Router();

Admin.post(
  "/role/add",
  (req, res, next) => {
    authenticate(req, res, next, "super_admin");
  },
  AddRoleValidation,
  errorHandler(addRole)
)

  .get(
    "/role/read/:id",
    (req, res, next) => {
      authenticate(req, res, next, "super_admin");
    },
    errorHandler(readRoleById)
  )

  .get(
    "/role/read",
    (req, res, next) => {
      authenticate(req, res, next, "super_admin");
    },
    errorHandler(readRoles)
  )

  .put(
    "/role/update",
    (req, res, next) => {
      authenticate(req, res, next, "super_admin");
    },
    updateRoleValidation,
    errorHandler(updateRole)
  )

  .delete(
    "/role/delete/:id",
    (req, res, next) => {
      authenticate(req, res, next, "super_admin");
    },
    errorHandler(deleteRole)
  )

  .post(
    "/component/add",
    (req, res, next) => {
      authenticate(req, res, next, "super_admin");
    },
    Multer().array("file"),
    AddComponentValidation,
    errorHandler(addComponent)
  )

  .get("/component/read/:id", errorHandler(readComponentById))

  .get("/component/read", errorHandler(readComponents))

  .put(
    "/component/update",
    (req, res, next) => {
      authenticate(req, res, next, "super_admin");
    },
    updateComponentValidation,
    errorHandler(updateComponent)
  )

  .delete(
    "/component/delete/:id",
    (req, res, next) => {
      authenticate(req, res, next, "super_admin");
    },
    errorHandler(deleteComponent)
  )

  .post(
    "/page/add",
    (req, res, next) => {
      authenticate(req, res, next, "super_admin");
    },
    AddPageValidation,
    errorHandler(AddPage)
  )

  .get("/page/read", errorHandler(readPages))

  .get(
    "/page/read/:id",

    errorHandler(readPageById)
  )

  .put(
    "/page/update",
    (req, res, next) => {
      authenticate(req, res, next, "super_admin");
    },
    updatePageValidation,
    errorHandler(updatePage)
  )

  .delete(
    "/page/delete/:id",
    (req, res, next) => {
      authenticate(req, res, next, "super_admin");
    },
    errorHandler(deletePage)
  )

  .post(
    "/user/add",
    (req, res, next) => {
      authenticate(req, res, next, "super_admin");
    },
    addUserValidation,
    errorHandler(addUser)
  )

  .get("/user/read/:id", errorHandler(readUserById))

  .get("/user/read", errorHandler(readUsers))

  .put(
    "/user/update",
    (req, res, next) => {
      authenticate(req, res, next, "super_admin");
    },
    updateUserValidation,
    errorHandler(updateUser)
  )

  .delete(
    "/user/delete/:id",
    (req, res, next) => {
      authenticate(req, res, next, "super_admin");
    },
    errorHandler(deleteUser)
  );
