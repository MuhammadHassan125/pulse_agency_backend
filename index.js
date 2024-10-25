import express from "express";
import cors from "cors";
import helmet from "helmet";
import { GeneralRoute } from "./src/general/routes.js";
import { PORT } from "./src/config/configurations.js";
import { Admin } from "./src/admin/routes.js";
import { connectDb } from "./src/database/connection.js";
import { seed } from "./src/database/seed.js";

connectDb();

seed();

express()
  .use(cors())

  .use(helmet())

  .use(express.json())

  .use("/components", express.static("src/uploads/components"))

  .use("/", GeneralRoute)

  .use("/", Admin)

  .get("/", (req, res) => res.send(`App listening on port ${PORT}!`))

  .use("/*", (req, res) => res.send("Invalid Url!"))

  .listen(PORT, () => console.log(`App listening on port ${PORT}!`));
