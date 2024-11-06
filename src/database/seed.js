import { DEFAULT_ROLES, SUPER_ADMIN_CONFIG } from "../config/configurations.js";
import { encryptPassword } from "../services/utils/commonUtils.js";
import { userModel, userRolesModel } from "./models.js";
import { insertSingle, readSingle } from "./query.js";

export const seed = async () => {
  try {
    let roles = DEFAULT_ROLES;

    roles = roles
      .replace(/[\[\]]/g, "")
      .split(",")
      .map((role) => role.trim());

    await Promise.all(
      roles?.map(async (name) => {
        const slug = name?.trim()?.toLowerCase()?.replace(/\s+/g, "_");

        let role = await readSingle(userRolesModel, { slug });

        if (!role) role = await insertSingle(userRolesModel, { name, slug });
      })
    );
    const role = await readSingle(userRolesModel, { name: roles[1] });

    const data = SUPER_ADMIN_CONFIG;

    data.password = await encryptPassword(data.password);

    data.roleId = role?._id;

    const user = await readSingle(userModel, {
      email: SUPER_ADMIN_CONFIG?.email,
    });

    if (!user) await insertSingle(userModel, data);
  } catch (error) {
    console.log(error);
  }
};
