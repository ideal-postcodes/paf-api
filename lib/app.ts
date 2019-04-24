import e from "express";

const express = e;
const OK = 200;

export const App = (): Express.Application => {
  const app = express();

  app.get("/", (_, response) => {
    response.status(OK).send("<h1>Ping</h1>");
  });

  return app;
};
