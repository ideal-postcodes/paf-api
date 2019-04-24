import request from "supertest";
import { App } from "../lib/app";

const app = App();
const OK = 200;

describe("Application server", () => {
  it("returns 200 OK on /", done => {
    request(app)
      .get("/")
      .expect(OK)
      .end(done);
  });
});
