# COVID-19 API
This API provides the latest information on COVID-19 cases. You can query the API by country. 
\
__Source:__ It retrieves the information from another public API - [disease.sh](https://disease.sh/)

### Table of Contents
* [Access the API (Base URL)](#access) 
* [Use the API (Endpoints)](#usage)
* [Example Requests](#examples)
* [Health Check](#healthcheck)
* [Install and Run Locally](#local)


<a name="access"></a>
## Access the API (Base URL)
The API is hosted on __AWS Lambda__. The base URL is:

```
https://abqqizmjxf.execute-api.eu-central-1.amazonaws.com/dev
```


<a name="usage"></a>
## Use the API
The API follows the REST standard. It accepts `GET` and `HEAD` requests only. Any other HTTP request method results in a 405 HTTP response (Method Not Allowed). If there is no error, the API responds to `GET` requests with JSON data in the response body.
\
\
To use the API, append one of the following 3 endpoints to the [base URL](#access):

### 1. Get COVID-19 Cases for All Countries
```
/covid/countries
```

returns a list of the COVID-19 cases for all countries from A to Z.


### 2. Get COVID-19 Cases for One Specific Country
```
/covid/countries/<COUNTRY>
```

returns the COVID-19 cases for a specific country only. You can specify the country using the

1. __country name__, e.g. _/covid/countries/Germany_
2. ISO 3166-1 alpha-2 __country code__, e.g. _/covid/countries/de_ for Germany
2. ISO 3166-1 alpha-3 __country code__, e.g. _/covid/countries/deu_ for Germany

The country endpoint path is case-insensitive, e.g. if you used "gerManY", "DE" or "deU", this would work as well.


### 3. Get One Specific Datapoint from a Country's COVID-19 Cases
```
/covid/countries/<COUNTRY>?datapoint=<QUERY-PARAMETER>
```

returns one specific datapoint from the COVID-19 cases of a country, e.g. cases, today's cases, deaths or today's deaths.

Here is a list of all available query parameters:
```
cases
todayCases
deaths
todayDeaths
recovered
todayRecovered
active
critical
casesPerOneMillion
deathsPerOneMillion
tests
testsPerOneMillion
population
continent
oneCasePerPeople
oneDeathPerPeople
oneTestPerPeople
activePerOneMillion
recoveredPerOneMillion
criticalPerOneMillion
```

The query parameters use camel casing. Alternatively, you can use dashes or underscores to separate words within a query parameter. In addition, the query parameter becomes case-insensitive when you use dashes or underscores. 
\
\
Below are some examples of an acceptable query parameter:
```
/covid/countries/de?datapoint=Today Deaths

/covid/countries/de?datapoint=today-deaths

/covid/countries/de?datapoint=TODAY_DEATHS

/covid/countries/de?datapoint=todayDeaths
```

Here is an example of an __unacceptable__ query parameter:
```
/covid/countries/de?datapoint=todaydeaths
```


<a name="examples"></a>
## Example Requests
A `GET` request to 
```
https://abqqizmjxf.execute-api.eu-central-1.amazonaws.com/dev/covid/countries
```
will return the COVID-19 cases for all countries from A-Z.
\
\
A `GET` request to 
```
https://abqqizmjxf.execute-api.eu-central-1.amazonaws.com/dev/covid/countries/swe
```
will return the COVID-19 cases for Sweden.
\
\
A `GET` request to 
```
https://abqqizmjxf.execute-api.eu-central-1.amazonaws.com/dev/covid/countries/japan?datapoint=today-deaths
```
will return today's deaths from COVID-19 in Japan.
\
\
A `POST` request to 
```
https://abqqizmjxf.execute-api.eu-central-1.amazonaws.com/dev/covid/countries/usa
```
will return a 405 HTTP response saying "Not Acceptable".


<a name="healthcheck"></a>
## Health Check
To check the API's health, append the following endpoint to the [base URL](#access):

```
/healthcheck
```

This returns a JSON object which includes the keys:
1. "uptime"
2. "responsetime"
3. "message" 
4. "timestamp"

If the API is healthy, the status code of the HTTP response will be 200 and the message will say "OK". 


<a name="local"></a>
## Install and Run Locally

### Prerequisites
To install and run this service locally, you require
1. [Node.js](https://nodejs.org/en/) version ≥ 18.13.0
2. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version ≥ 8.19.3


### Install Dependencies
The API depends on the following packages:
Package                                                                | Version
---------------------------------------------------------------------- | -------
[express](https://www.npmjs.com/package/express)                       | ≥ 4.18.2
[lodash.camelcase](https://www.npmjs.com/package/lodash.camelcase)     | ≥ 4.3.0
[serverless-http](https://www.npmjs.com/package/serverless-http)       | ≥ 3.1.1
[serverless-offline](https://www.npmjs.com/package/serverless-offline) | ≥ 12.0.4


Open your Terminal, make sure you are in the project folder of this application and enter the below command to install the above packages:
```
npm install
````


### Run Locally
To run the service locally, enter the following command in your Terminal:
```
serverless offline start
````

The Serverless Offline plugin emulates AWS Lambda and API Gateway on your local machine. The Lambda function is now running on your localhost. The default port is 3000. You will see the base URL in the Terminal, too:
```
http://localhost:3000/dev
````

Now you can start using the API: Append one of the allowed [endpoint paths](#usage) to the base URL, open your web browser and enter the complete URL. E.g.
```
http://localhost:3000/dev/covid/countries/de?datapoint=cases
````
This will return a single datapoint - all COVID-19 cases there have been in Germany.













