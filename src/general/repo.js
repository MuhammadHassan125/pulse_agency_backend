import { sqlConnection } from "../database/connection.js";

export const readUserWithRole = async (filter) => {
  try {
    const keys = Object.keys(filter);

    const readValues = Object.values(filter).map((value) => {
      if (typeof value === "boolean") return `${value}`;
      else if (value === null) return "NULL";
      else return `'${Array.isArray(value) ? JSON.stringify(value) : value}'`;
    });

    const readPairs = keys
      .map((key, i) => `${key}=${readValues[i]}`)
      .join(" AND ");

    const query =
      `SELECT users.*, role.id as roleId, role.slug,role.name as roleName
FROM users
LEFT JOIN user_roles ur ON ur.userId = users.id
LEFT JOIN roles role ON role.id = ur.roleId
WHERE users.` + `${readPairs} LIMIT 1;`;

    const [rows, _fields] = await sqlConnection().execute(query);

    return rows[0];
  } catch (error) {
    console.log({ error });
    return error;
  }
};
