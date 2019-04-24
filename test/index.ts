import { app } from "../lib/index";
import request from "supertest";

describe("Server", () => {
  it ("exports an application server", async () => {
    await request(app).get("/").expect(200); 
  });
});

