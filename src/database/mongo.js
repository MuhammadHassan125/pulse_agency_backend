import { getEpochTime } from "../services/utils/commonUtils.js";
import { v4 as uuidv4 } from "uuid";

export const insertSingle = async (c, d) => {
  d.uid = uuidv4();
  d.createdAt = getEpochTime();
  return await c.create(d);
};

export const readSingle = async (c, f) => {
  return await c.findOne(f);
};

export const readMultiple = async (c, f, l, s) => {
  s = s ? s : { createdAt: -1 };

  return l ? await c.find(f).limit(l).sort(s) : await c.find(f).sort(s);
};

export const readWithPagination = async (c, f, l, s, p) => {
  s = s ? s : { createdAt: -1 };

  return await c
    .find(f)
    .sort(s)
    .limit(l ? l : 10 * 1)
    .skip((p - 1) * l ? l : 10);
};

export const updateSingle = async (c, f, u) => {
  return await c.updateOne(f, u, { new: true });
};
export const updateMultiple = async (c, f, u) => {
  return await c.updateMany(f, u);
};

export const deleteRecord = async (c, f) => {
  return await c.deleteMany(f);
};
