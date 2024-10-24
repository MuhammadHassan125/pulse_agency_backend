import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize, errors } = format;

export const logger = createLogger({
  level: "info",
  format: combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    printf(({ level, message, timestamp, stack }) => {
      return `Time: ${timestamp}, level: ${level}, message: ${
        stack || message
      } \n`;
    })
  ),
  transports: [new transports.File({ filename: "errors.log", level: "error" })],
});
