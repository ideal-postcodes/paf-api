declare module "express-pino-logger" {
  import * as express from "express";
  import * as pino from "pino";
  interface Config {
    logger: pino.Logger;
  }
  var expressPino: (config: Config) => express.Handler;
  export = expressPino;
}
