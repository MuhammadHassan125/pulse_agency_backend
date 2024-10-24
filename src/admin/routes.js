import { Router } from "express";
import {
  addComponent,
  AddPage,
  addRole,
  deleteComponent,
  deletePage,
  deleteRole,
  readComponentById,
  readComponents,
  readPageById,
  readPages,
  readRoleById,
  readRoles,
  updateComponent,
  updatePage,
  updateRole,
} from "./controllers.js";

import {
  AddComponentValidation,
  AddPageValidation,
  AddRoleValidation,
  updateComponentValidation,
  updatePageValidation,
  updateRoleValidation,
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
    "/component/delete",
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
  );
