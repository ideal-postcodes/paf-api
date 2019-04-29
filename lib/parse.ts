import { Address, AddressRecord } from "uk-clear-addressing";

interface FormattedAddress {
  premise: string;
  line_1: string;
  line_2: string;
  line_3: string;
  post_town: string;
  postcode: string;
}

interface AddressQuery {
  building_name: string;
  building_number: string;
  sub_building_name: string;
  dependant_locality: string;
  double_dependant_locality: string;
  thoroughfare: string;
  dependant_thoroughfare: string;
  po_box: string;
  post_town: string;
  postcode: string;
  department_name: string;
  organisation_name: string;
}

interface Response {
  query: AddressQuery;
  formatted: FormattedAddress;
}
export const parse = (body: AddressRecord): Response => {
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
  } = body;

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

  const address = new Address(query);

  const formatted = {
    line_1: address.line_1,
    line_2: address.line_2,
    line_3: address.line_3,
    post_town: address.post_town,
    postcode: address.postcode,
    premise: address.premise,
  };

  return { query, formatted };
};
