import { createLogger, format, transports } from "winston";

const { combine, timestamp, colorize, printf } = format;

const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

export const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    colorize(),
    format.errors({ stack: true }), // Capture stack traces
    customFormat
  ),
  transports: [new transports.Console()],
});
