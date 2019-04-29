<h1 align="center">
  <img src="https://img.ideal-postcodes.co.uk/PAF%20API%20Logo@3x.png" alt="PAF API">
</h1>

> HTTP API that parses Postcode Address File records into correctly formatted address lines

[![CircleCI](https://circleci.com/gh/ideal-postcodes/paf-api.svg?style=svg)](https://circleci.com/gh/ideal-postcodes/paf-api)
[![Dependency Status](https://david-dm.org/ideal-postcodes/paf-api.png)](https://david-dm.org/ideal-postcodes/paf-api)
[![Coverage Status](https://coveralls.io/repos/github/ideal-postcodes/paf-api/badge.svg?branch=master)](https://coveralls.io/github/ideal-postcodes/paf-api?branch=master)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ideal-postcodes/paf-api)

Parses Postcode Address File records into correctly formatted address recognised by Royal Mail according to its Clear Addressing Guidelines.

Produces consistent address lines, a post town line and a postcode line via HTTP

## Features

- Exposes [UK Clear Addressing](https://github.com/ideal-postcodes/uk-clear-addressing) as a HTTP service
- Deployable as a docker container or node.js application

![Correct Addressing](https://img.ideal-postcodes.co.uk/correct_address.gif)

## Links

- [Github Repository](https://github.com/ideal-postcodes/paf-api)
- [Test Live on paf-api.ideal-postcodes.dev](https://paf-api.ideal-postcodes.dev)
- [Docker Hub Image](https://hub.docker.com/r/idealpostcodes/paf-api)
- [UK Clear Addressing Project](https://github.com/ideal-postcodes/uk-clear-addressing)
- [NPM Package](https://www.npmjs.com/package/paf-api)
- [More information on Postcode Address File data attributes](https://ideal-postcodes.co.uk/documentation/paf-data)
- [PAF Programmer's Guide](https://js.ideal-postcodes.co.uk/guide.pdf)

## Getting Started

Try on [paf-api.ideal-postcodes.dev](https://paf-api.ideal-postcodes.dev)

```bash
curl -X POST \
  https://paf-api.ideal-postcodes.dev/parse \
  -H 'Content-Type: application/json' \
  -d '{ "sub_building_name": "Flat 8", "building_name": "Oxford House 110-114", "thoroughfare": "High Street" }'
```

### HTTP API Usage

This API responds to `POST` requests to `/parse` with a JSON payload representing a PAF Record

#### `POST /parse`

##### Request

```json
POST /parse

{
  "postcode": "WS11 5SB",
  "post_town": "CANNOCK",
  "thoroughfare": "Pye Green Road",
  "building_name": "Flower House 189A",
  "organisation_name": "S D Alcott Florists",
}
```

##### Response

```json
{
  "query": {
    "postcode": "WS11 5SB",
    "post_town": "CANNOCK",
    "thoroughfare": "Pye Green Road",
    "building_name": "Flower House 189A",
    "organisation_name": "S D Alcott Florists",
    "building_number": "",
    "sub_building_name": "",
    "dependant_locality": "",
    "double_dependant_locality": "",
    "dependant_thoroughfare": "",
    "po_box": "",
    "department_name": "",
  },
  "formatted": {
    "postcode": "WS11 5SB",
    "post_town": "CANNOCK",
    "line_1": "S D Alcott Florists",
    "line_2": "Flower House",
    "line_3": "189a Pye Green Road",
    "premise": "Flower House, 189a"
  }
}
```

#### Available Payload Attributes

```javascript
{
  building_number: string | number;
  building_name: string;
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
```

### Deploy

#### Deploy as a docker container

Using the docker CLI

```
docker pull ideal-postcoes/paf-api:latest

docker run -p 8080:8080 ideal-postcodes/paf-api
```

Alternatively with docker-compose

```bash
git clone https://github.com/ideal-postcodes/paf-api && cd paf-api

docker-compose up -d
```

#### Deploy as a node.js process

Requires node.js 8 or above

```bash
git clone https://github.com/ideal-postcodes/paf-api && cd paf-api && npm install

npm start # Traffic served on 8080
```

#### NPM Module

The npm module exports an express app factory which takes a `pino` logger

```javascript
const { App } = require("paf-api");

const app = App({ logger: pino() });

http.createServer(app).listen(PORT);
```

#### Configuration

The following environment variables can be passed to the application.

```bash
PORT=8080 # Sets the port to listen on
```

## Licence

MIT

