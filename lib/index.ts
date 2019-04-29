import { App } from "./app";
import http from "http";
import P from "pino";

const DEFAULT_PORT = 8909;
const port = DEFAULT_PORT;

const logger = P();

export const app = App({ logger });

http.createServer(app).listen(port);

logger.info(`Server listening on ${port}`);
