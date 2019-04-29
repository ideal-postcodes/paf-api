import { parse } from "./parse";

export interface Context {}

export interface Event {
  body: string;
}

interface Callback {
  (error: null | Error, response: Response): void;
}

type Headers = { [k: string]: string };

interface Response {
  statusCode: number;
  body: string;
  headers: Headers;
}

interface NetlifyEventHandler {
  (event: Event, context: Context, callback: Callback): void;
}

const OK = 200;
const BAD_REQUEST = 400;

interface ToJsonOptions {
  body: object;
  statusCode: number;
}

const toJson = ({ body, statusCode }: ToJsonOptions): Response => {
  const jsonString = JSON.stringify(body);
  return {
    body: jsonString,
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const handler: NetlifyEventHandler = (event, _, callback) => {
  try {
    const query = JSON.parse(event.body);
    const body = parse(query);
    const statusCode = OK;
    callback(null, toJson({ statusCode, body }));
  } catch (_) {
    const statusCode = BAD_REQUEST;
    const body = { error: "Invalid JSON Submitted" };
    return callback(null, toJson({ statusCode, body }));
  }
};
