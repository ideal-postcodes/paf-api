import e from "express";
import { Address } from "uk-clear-addressing";

const express = e;
const OK = 200;
const NOT_FOUND = 404;

export const App = (): Express.Application => {
  const app = express();

  app.use(express.json());

  app.get("/", (_, response) => {
    response.status(OK).send("<h1>Ping</h1>");
  });

  app.post("/parse", (request, response) => {
    const {
      building_name = "",
      building_number = "",
      sub_building_name = "",
      dependant_locality = "",
      double_dependant_locality = "",
      thoroughfare = "",
      dependant_thoroughfare = "",
      po_box = "",
      post_town = "",
      postcode = "",
      department_name = "",
      organisation_name = "",
    } = request.body;

    const address = new Address(request.body);
    const formatted = {
      line_1: address.line_1,
      line_2: address.line_2,
      line_3: address.line_3,
      post_town: address.post_town,
      postcode: address.postcode,
      premise: address.premise,
    };

    const query = {
      building_name,
      building_number,
      sub_building_name,
      dependant_locality,
      double_dependant_locality,
      thoroughfare,
      dependant_thoroughfare,
      po_box,
      post_town,
      postcode,
      department_name,
      organisation_name,
    };

    response.status(OK).json({ query, formatted });
  });

  app.all("/", (_, response) => {
    response.status(NOT_FOUND).json({
      code: NOT_FOUND,
      message: "Resource not found. Try POST /parse",
    });
  });

  return app;
};
