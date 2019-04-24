import request from "supertest";
import { App } from "../lib/app";

const app = App();
const OK = 200;
const NOT_FOUND = 404;

describe("Application server", () => {
  it("returns 200 OK on /", async () => {
    const response = await request(app)
      .get("/")
      .expect(OK);
  });

  it("returns 404 on all other routes", async () => {
    const response = await request(app)
      .get("/foo")
      .expect(NOT_FOUND);
  });
});
