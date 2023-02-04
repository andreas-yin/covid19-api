export const INTERNAL_SERVER_ERROR =
  'Internal server error. Please try again later.';
export const INVALID_PATH =
  "Invalid path. Available paths: '/countries' and '/healthcheck'";
export const COUNTRY_NOT_FOUND =
  "Country not found or doesn't have any cases. If you've used a full country name, try an ISO2 or ISO3 country code instead.";
export const DATAPOINT_NOT_FOUND =
  "Datapoint not found. Datapoint value has to be a specific string, 'cases', 'todayCases', 'deaths' or 'todayDeaths'. Camel, Pascal, snake or kebap case or spaces between words required.";
export const INVALID_QUERY =
  "Bad request: invalid query parameters. Only 1 query parameter with a key of 'datapoint' allowed.";
export const METHOD_NOT_ALLOWED =
  'HTTP request method not allowed. This service only accepts GET and HEAD requests.';
