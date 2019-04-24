import { App } from "./app";
import http from "http";

const DEFAULT_PORT = 8909;
const port = DEFAULT_PORT;

export const app = App();

http.createServer(app).listen(port);
console.log(`Server listening on ${port}`);

