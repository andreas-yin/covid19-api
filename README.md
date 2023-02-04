# COVID-19 API

This API provides the latest information on COVID-19 cases. You can query the API by country.
\
**Source:** It retrieves the information from another public API - [disease.sh](https://disease.sh/)

### Table of Contents

- [Install and Run Locally](#local)
- [Endpoints](#endpoints)
- [Example Requests](#examples)
- [Use the API Hosted on AWS Lambda](#aws)

<a name="local"></a>

## Install and Run Locally

### Prerequisites

To install and run the API locally, you require

1. [Node.js](https://nodejs.org/en/) version ≥ 18.13.0
2. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version ≥ 8.19.3

### Install Dependencies

The API depends on the following packages:
| Package | Version |
| ------- | ------- |
| [express](https://www.npmjs.com/package/express) | 4.18.2 |
| [lodash.camelcase](https://www.npmjs.com/package/lodash.camelcase) | 4.3.0 |
| [serverless-http](https://www.npmjs.com/package/serverless-http) | 3.1.1 |
| [serverless-offline](https://www.npmjs.com/package/serverless-offline) | 12.0.4 |
| [eslint](https://www.npmjs.com/package/eslint) | 8.33.0 |

Open your Terminal, make sure you are in the project folder of this application and enter the below command to install the above packages:

```
npm install
```

### Run Locally

To run the application locally, enter the following command in your Terminal:

```
npm run start
```

This makes use of the Serverless Offline plugin, which emulates AWS Lambda and API Gateway on your local machine. The Lambda function is now running on your localhost. The default port is 3000.

### Base URL

You'll see the base URL in your Terminal:

```
http://localhost:3000/dev
```

Make a request to the API by appending one of the available [endpoints](#endpoints) to this base URL.

<a name="endpoints"></a>

## Endpoints

The endpoints follow the REST standard.

### `/countries`

|                          |                                           |
| ------------------------ | ----------------------------------------- |
| **Query parameters**     | N/A                                       |
| **Allowed HTTP methods** | `GET`, `HEAD`                             |
| **Response**             | COVID-19 cases for all countries from A-Z |
| **Response format**      | JSON                                      |

### `/countries/{country}`

<!-- prettier-ignore -->
|     |     |
| --- | --- |
| **Dynamic path** | `{country}` specifies a country. Acceptable strings:<br>1. **Full country name**, e.g. `Germany`<br>2. **ISO 2-digit country code**, e.g. `de` for Germany<br>3. **ISO 3-digit country code**, e.g. `deu` for Germany<br>`{country}` is treated as case-insensitive. |
| **Query parameters**     | Only 1 query parameter of `datapoint: string` allowed.<br>The key `datapoint` is treated as case-insensitive.<br>Only certain strings accepted as a value for `datapoint` (e.g. `todayCases` or `todayDeaths`).<br>The value string for `datapoint` has to be in camel, Pascal, snake or kebap case.<br> |
| **Allowed HTTP methods** | `GET`, `HEAD`                                                           |
| **Response**             | COVID-19 cases (or one single datapoint thereof) for a specific country |
| **Response format**      | JSON                                                                    |
| **Common errors**        | The **country can't be found** or there is no data available for this country (HTTP 404). Please use an ISO country code instead and try again.<br>The value for datapoint is in lowercase, so the **datapoint can't be found** (HTTP 404). Please use camel, Pascal, snake or kebap case and try again. |

Here is a list of acceptable string values for the `datapoint` query parameter:

```
datapoint:
| "cases"
| "todayCases"
| "deaths"
| "todayDeaths"
| "recovered"
| "todayRecovered"
| "active"
| "critical"
| "casesPerOneMillion"
| "deathsPerOneMillion"
| "tests"
| "testsPerOneMillion"
| "population"
| "continent"
| "oneCasePerPeople"
| "oneDeathPerPeople"
| "oneTestPerPeople"
| "activePerOneMillion"
| "recoveredPerOneMillion"
| "criticalPerOneMillion"
```

### `/healthcheck`

<!-- prettier-ignore -->
|                          |               |
| ------------------------ | ------------- |
| **Query parameters**     | N/A           |
| **Allowed HTTP methods** | `GET`, `HEAD` |
| **Response**             | Information about the API's health: `uptime`, `runtime`, `message` and `timestamp`. If the API is healthy, you'll receive a `message: "OK"`. |
| **Response format**      | JSON          |

<a name="examples"></a>

## Example Requests

`GET` http://localhost:3000/dev/countries
\
returns the COVID-19 cases for all countries from A-Z.
\
\
`GET` http://localhost:3000/dev/countries/swe
\
returns the COVID-19 cases for Sweden.
\
\
`GET` http://localhost:3000/dev/countries/japan?datapoint=today-deaths
\
returns today's deaths from COVID-19 in Japan.
\
\
`GET` http://localhost:3000/dev/countries/blabla
\
returns a 404 HTTP response (Country Not Found).
\
\
`GET` http://localhost:3000/dev/countries/brazil?datapoint=todaycases
\
returns a 404 HTTP response (Datapoint Not Found).
\
\
`POST` http://localhost:3000/dev/countries/usa
\
returns a 405 HTTP response (Method Not Allowed).

<a name="aws"></a>

## Use the API Hosted on AWS Lambda

This API has been deployed to AWS Lambda. To use the service, replace http://localhost:3000/dev with the following **base URL**:

```
https://abqqizmjxf.execute-api.eu-central-1.amazonaws.com/dev
```
