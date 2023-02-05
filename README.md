# COVID-19 API

This API provides a summary of COVID-19 cases. The summary contains 4 datapoints:

1. Cases
2. Today's cases
3. Deaths
4. Today's deaths

You can query the API by country.
\
**Source:** It retrieves the latest COVID-19 data from another public API - [disease.sh](https://disease.sh/)

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
| [prettier](https://www.npmjs.com/package/prettier) | 2.8.3 |
| [eslint](https://www.npmjs.com/package/eslint) | 8.33.0 |
| [jest](https://www.npmjs.com/package/jest) | 29.4.1 |
| [supertest](https://www.npmjs.com/package/supertest) | 6.3.3 |

Open your Terminal, make sure you are in the project folder of this application and enter the below command to install the above packages:

```
npm install
```

### Run Locally

To run the application locally, enter the following command in your Terminal:

```
npm start
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

|                          |                                     |
| ------------------------ | ----------------------------------- |
| **Query parameters**     | N/A                                 |
| **Allowed HTTP methods** | `GET`, `HEAD`                       |
| **Response**             | Summary of COVID-19 cases worldwide |
| **Response format**      | JSON                                |

### `/countries/{country}`

<!-- prettier-ignore -->
|     |     |
| --- | --- |
| **Dynamic path** | `{country}` specifies a country. Acceptable strings:<br>1. **Full country name**, e.g. `Germany`<br>2. **ISO 2-digit country code**, e.g. `de` for Germany<br>3. **ISO 3-digit country code**, e.g. `deu` for Germany<br>`{country}` is treated as case-insensitive. |
| **Query parameters**     | Only 1 query parameter of `datapoint: string` allowed.<br>The key `datapoint` is treated as case-insensitive.<br>Only certain strings accepted as a value for `datapoint` (e.g. `todayCases` or `todayDeaths`).<br>The value string for `datapoint` has to be in camel, Pascal, snake or kebap case or use spaces between words.<br> |
| **Allowed HTTP methods** | `GET`, `HEAD`                                                           |
| **Response**             | Summary of COVID-19 cases (or one single datapoint thereof) for a specific country |
| **Response format**      | JSON                                                                    |
| **Common errors**        | The **country can't be found** or there is no data available for this country (HTTP 404). Please use an ISO country code instead and try again.<br>The value for datapoint is in lowercase, so the **datapoint can't be found** (HTTP 404). Please use camel, Pascal, snake or kebap case or spaces between words and try again. |

Here is a list of acceptable string values for the `datapoint` query parameter:

```
datapoint:
| "cases"
| "todayCases"
| "deaths"
| "todayDeaths"
```

### `/healthcheck`

<!-- prettier-ignore -->
|                          |               |
| ------------------------ | ------------- |
| **Query parameters**     | N/A           |
| **Allowed HTTP methods** | `GET`, `HEAD` |
| **Response**             | Information about the API's health: `uptime`, `responsetime`, `message` and `timestamp`. If the API is healthy, you'll receive a `message: "OK"`. |
| **Response format**      | JSON          |

<a name="examples"></a>

## Example Requests

`GET` http://localhost:3000/dev/countries
\
returns a summary of the COVID-19 cases worldwide.
\
**Example response** (from February 4, 2023):

```
{
    "cases": 676106630,
    "todayCases": 98996,
    "deaths": 6770499,
    "todayDeaths": 539
}
```

`GET` http://localhost:3000/dev/countries/swe
\
returns a summary of the COVID-19 cases for Sweden.
\
**Example response** (from February 4, 2023):

```
{
    "country": "Sweden",
    "cases": 2694893,
    "todayCases": 0,
    "deaths": 23419,
    "todayDeaths": 0
}
```

`GET` http://localhost:3000/dev/countries/japan?datapoint=today-deaths
\
returns today's deaths from COVID-19 in Japan.
\
**Example response** (from February 4, 2023):

```
{
    "todayDeaths": 256
}
```

`GET` http://localhost:3000/dev/countries/blabla
\
returns a 404 HTTP response (Country Not Found).
\
**Example response**:

```
{
    "message": "Country not found or doesn't have any cases. If you've used a full country name, try an ISO2 or ISO3 country code instead."
}
```

`GET` http://localhost:3000/dev/countries/brazil?datapoint=todaycases
\
returns a 404 HTTP response (Datapoint Not Found).
\
**Example response**:

```
{
    "message": "Datapoint not found. Datapoint value has to be a specific string, 'cases', 'todayCases', 'deaths' or 'todayDeaths'. Camel, Pascal, snake or kebap case or spaces between words required."
}
```

`POST` http://localhost:3000/dev/countries/usa
\
returns a 405 HTTP response (Method Not Allowed).
\
**Example response**:

```
{
    "message": "HTTP request method not allowed. This service only accepts GET and HEAD requests."
}
```

<a name="aws"></a>

## Use the API Hosted on AWS Lambda

This API has been deployed to AWS Lambda. To use the service, replace http://localhost:3000/dev with the following **base URL**:

```
https://abqqizmjxf.execute-api.eu-central-1.amazonaws.com/dev
```
