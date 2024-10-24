import { sqlConnection } from "./connection.js";

export const insertSingle = async (table, data) => {
  const keys = Object.keys(data);

  const values = Object.values(data).map((value) => {
    if (typeof value === "boolean") return `${value}`;
    else if (value === null) return "NULL";
    else return `'${Array.isArray(value) ? JSON.stringify(value) : value}'`;
  });

  const query = `INSERT INTO ${table} (${keys}) VALUES(${values})`;
  const [result] = await sqlConnection().execute(query);
  return result;
};

export const readSingle = async (table, filter) => {
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

    const query = `SELECT * FROM ${table} WHERE ` + ` ${readPairs} LIMIT 1`;

    const [rows, _fields] = await sqlConnection().execute(query);
    return rows[0];
  } catch (error) {
    return error;
  }
};

export const readMultiple = async (table, filter) => {
  try {
    let query;

    if (!filter) query = `SELECT * FROM ${table} `;
    else {
      const keys = Object.keys(filter);

      const readValues = Object.values(filter).map((value) => {
        if (typeof value === "boolean") return `${value}`;
        else if (value === null) return "NULL";
        else return `'${Array.isArray(value) ? JSON.stringify(value) : value}'`;
      });

      const readPairs = keys
        .map((key, i) => `${key}=${readValues[i]}`)
        .join(" AND ");
      query = `SELECT * FROM ${table} WHERE ` + ` ${readPairs} ORDER BY id`;
    }
    const [rows, _fields] = await sqlConnection().execute(query);
    return rows;
  } catch (error) {
    return error;
  }
};

export const updateSingle = async (table, readFilter, updateFilter) => {
  try {
    const readKeys = Object.keys(readFilter);

    const readValues = Object.values(readFilter).map(
      (value) => `'${Array.isArray(value) ? JSON.stringify(value) : value}'`
    );

    const readPairs = readKeys
      .map((key, i) => `${key}=${readValues[i]}`)
      .join(" AND ");

    const updateKeys = Object.keys(updateFilter);

    const updateValues = Object.values(updateFilter).map((value) => {
      if (typeof value === "boolean") return `${value}`;
      else if (value === null) return "NULL";
      else return `'${Array.isArray(value) ? JSON.stringify(value) : value}'`;
    });

    const updatePairs = updateKeys
      .map((key, i) => `${key}=${updateValues[i]}`)
      .join(", ");
    const query = `UPDATE ${table} SET ${updatePairs} WHERE ${readPairs}`;

    const [rows, _fields] = await sqlConnection().execute(query);
    return rows[0];
  } catch (error) {
    return error;
  }
};

export const deleteSingle = async (table, readFilter) => {
  try {
    const keys = Object?.keys(readFilter);

    let readPairs;

    if (readFilter) {
      const readValues = Object.values(filter).map((value) => {
        if (typeof value === "boolean") return `${value}`;
        else if (value === null) return "NULL";
        else return `'${Array.isArray(value) ? JSON.stringify(value) : value}'`;
      });

      readPairs = keys.map((key, i) => `${key}=${readValues[i]}`).join(" AND ");
    }

    const query = !readFilter
      ? `DELETE FROM ${table}`
      : `DELETE FROM ${table} WHERE ${readPairs}`;

    console.log({ query });
    const [result] = await sqlConnection().execute(query);

    return result;
  } catch (error) {
    return error;
  }
};
