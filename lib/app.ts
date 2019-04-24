import e from "express";
// import { Address } from "uk-clear-addressing";

const express = e;
const OK = 200;
const NOT_FOUND = 404;

export const App = (): Express.Application => {
  const app = express();
  app.use(express.json());

  app.get("/", (_, response) => {
    response.status(OK).send("<h1>Ping</h1>");
  });

  app.all("/", (_, response) => {
    response.status(NOT_FOUND).json({
      code: NOT_FOUND,
      message: "Resource not found. Try POST /parse",
    });
  });

  return app;
};
