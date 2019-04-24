import request from "supertest";
import { postcodes } from "@ideal-postcodes/api-fixtures";
import { App } from "../lib/app";
import { assert } from "chai";

const app = App();
const OK = 200;
const NOT_FOUND = 404;

const testAddresses = postcodes.success.body.result;

const testInput = testAddresses.map(address => {
  return {
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
});

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

  describe("POST /parse", () => {
    let index = 0;
    for (const address of testInput) {
      it(`returns a correctly parsed address for "${
        testAddresses[index].line_1
      }, ${testAddresses[index].postcode}"`, async () => {
        const response = await request(app)
          .post("/parse")
          .send(address)
          .expect(OK);

        assert.deepEqual(response.body, {
          query: address,
          formatted: {
            line_1: testAddresses[index].line_1,
            line_2: testAddresses[index].line_2,
            line_3: testAddresses[index].line_3,
            post_town: testAddresses[index].post_town,
            postcode: testAddresses[index].postcode,
            premise: testAddresses[index].premise,
          },
        });
        index += 1;
      });
    }
  });
});
