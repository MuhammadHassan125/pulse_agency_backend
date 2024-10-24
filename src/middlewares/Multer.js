import multer from "multer";

export const Multer = () => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "src/uploads/components");
      },

      filename: (req, file, cb) => {
        const otp = Math.floor(1000 + Math.random() * 900000);

        const name = `components_${otp}.${file.mimetype.split("/")[1]}`;

        cb(null, name);
      },
    }),
  });
};
