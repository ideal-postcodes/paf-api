import e from "express";
import P from "pino";
import expressPino from "express-pino-logger";
import { parse } from "./parse";

const express = e;
const OK = 200;
const NOT_FOUND = 404;

interface Config {
  logger: P.Logger;
}

export const App = (config: Config): Express.Application => {
  const { logger } = config;

  const app = express();

  app.use(expressPino({ logger }));
  app.use(express.json());

  app.get("/", (_, response) => {
    response.status(OK).send("<h1>Ping</h1>");
  });

  app.get("/healthz", (_, response) => {
    response.status(OK).json({ status: "UP" });
  });

  app.post("/parse", (request, response) => {
    response.status(OK).json(parse(request.body));
  });

  app.all("/", (_, response) => {
    response.status(NOT_FOUND).json({
      code: NOT_FOUND,
      message: "Resource not found. Try POST /parse",
    });
  });

  return app;
};
