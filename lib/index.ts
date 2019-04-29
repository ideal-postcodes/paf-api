import { App } from "./app";
import http from "http";
import P from "pino";

const DEFAULT_PORT = 8080;
const { PORT = DEFAULT_PORT } = process.env;

const logger = P();

export const app = App({ logger });

http.createServer(app).listen(PORT);

logger.info(`Server listening on ${PORT}`);
