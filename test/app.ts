import request from "supertest";
import { postcodes, addresses } from "@ideal-postcodes/api-fixtures";
import { App } from "../lib/app";
import { assert } from "chai";
import P from "pino";
import { resolve } from "path";

const pino = P;
const destination = pino.destination(resolve(__dirname, "./test.log"));
const logger = pino(destination);
const config = { logger };
const app = App(config);
const OK = 200;
const NOT_FOUND = 404;

const testAddresses = [
  ...postcodes.success.body.result,
  ...addresses.success.body.result.hits,
];

describe("Application server", () => {
  it("returns 200 OK on /", async () => {
    const response = await request(app)
      .get("/")
      .expect(OK);
  });

  it("provides readiness probe at /healthz", async () => {
    const response = await request(app)
      .get("/healthz")
      .expect(OK);
    assert.equal(response.body.status, "UP");
  });

  it("returns 404 on all other routes", async () => {
    const response = await request(app)
      .get("/foo")
      .expect(NOT_FOUND);
  });

  describe("POST /parse", () => {
    for (const address of testAddresses) {
      const { line_1, postcode } = address;
      it(`returns a correctly parsed address for "${line_1}, ${postcode}"`, async () => {
        const addressQuery = {
          building_name: address.building_name,
          building_number: address.building_number,
          sub_building_name: address.sub_building_name,
          dependant_locality: address.dependant_locality,
          double_dependant_locality: address.double_dependant_locality,
          thoroughfare: address.thoroughfare,
          dependant_thoroughfare: address.dependant_thoroughfare,
          po_box: address.po_box,
          post_town: address.post_town,
          postcode: address.postcode,
          department_name: address.department_name,
          organisation_name: address.organisation_name,
        };

        const response = await request(app)
          .post("/parse")
          .send(addressQuery)
          .expect(OK);

        assert.deepEqual(response.body, {
          query: addressQuery,
          formatted: {
            line_1: address.line_1,
            line_2: address.line_2,
            line_3: address.line_3,
            post_town: address.post_town,
            postcode: address.postcode,
            premise: address.premise,
          },
        });
      });
    }
  });
});
