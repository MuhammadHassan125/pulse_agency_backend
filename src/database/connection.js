import mysql from "mysql2/promise";
import { DATABASE_CONFIG } from "../../src/config/configurations.js";

// Create a singleton connection pool
const pool = mysql.createPool(DATABASE_CONFIG);

export const sqlConnection = () => {
  return pool;
};
