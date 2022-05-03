# Node Assignment

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The documentation for Node Assignment app which does basic CRUD functions on Requirement resources represented in JSON-LD.

## Video Walkthrough

- Watch the video walkthrough of the assignment [here](https://www.loom.com/share/525b5b4b197b4e559b378467973dfee0).

## Features

- Flexible Schema.

- Resources represented through JSON-LD.

- API documentation thtough Swagger UI.

- Testing through Jest.

- Dockerized app with the best practices.

## Quick Start

(OPTIONAL) Create a `.env` file with the following properties:

- SERVER_URL: Sets the current server url. It could be localhost for dev environment.

- NODE_ENV: Environment of node app.

- MONGO_URL: Sets the MongoDB URL, this should also work with DocumentDB.

- PORT (Optional): Sets the HTTP port number.

Then run the following command:

`docker-compose up --build`

The api will get exposed at [localhost:80](http//localhost:80).

## Testing workflow

The testing command will the run the test suite and will attempt to do the following:

1. Create 5 new requirements

2. Delete a requirement

3. Retrieve a specific requirement

4. Update a specific requirement to include an additional satisfiedBy property with the value “[https://api2.com/testcases/123](https://api2.com/testcases/123)”. Note: this additional property could also have a different name and a different value. The schema is entirely flexible and the properties can be completely dynamic.

5. Retrieve the updated requirement with the additional property

To run tests, run the following command:

`docker-compose -f docker-compose-test.yaml up --build`

## Project Structure

| Name | Description |

| ------------------- | ------------------------------------------------------- |

| **src/** | Source files |

| **src/controllers** | The controllers of the express app |

| **src/models** | Mongoose models with swagger documentation |

| **src/routes/** | Express REST API routes with swagger documentation |

| **src/utils** | Reusable utilises and library source code like a logger |

| **tests/** | Test suites are placed here |

## Postman Documentation

Postman Documentation and API Playground is hosted [here](https://documenter.getpostman.com/view/18809944/UyrHeYkt).
