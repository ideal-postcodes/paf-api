import { assert } from "chai";
import { handler, Event, Context } from "../lib/netlify/parse";
import { postcodes, addresses } from "@ideal-postcodes/api-fixtures";

const OK = 200;
const testAddresses = [
  ...postcodes.success.body.result,
  ...addresses.success.body.result.hits,
];

describe("Netlify FAAS", () => {
  describe("parse function", () => {
    for (const address of testAddresses) {
      const { line_1, postcode } = address;
      it(`returns a correctly parsed address for "${line_1}, ${postcode}"`, () => {
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

        const event: Event = { body: JSON.stringify(addressQuery) };
        const context: Context = {};
        handler(event, context, (error, response) => {
          if (error) throw error;
          assert.equal(response.statusCode, OK);
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
      });
    }
  });
});
