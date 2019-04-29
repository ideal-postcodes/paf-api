import { App } from "./app";
import http from "http";
import P from "pino";

const DEFAULT_PORT = 8080;
const { PORT = DEFAULT_PORT } = process.env;

const logger = P();

export const app = App({ logger });

const server = http.createServer(app).listen(PORT);

process.on("SIGTERM", () => {
  logger.info("Application terminating");
  server.close(() => {
    logger.info("HTTP server closed");
    process.exit(0);
  });
});

logger.info(`Server listening on ${PORT}`);
