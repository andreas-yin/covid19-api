const messages = {
  unavailable: 'Service currently unavailable. Please try again later.',
  invalidPath: "Invalid path. Available paths: '/countries' and '/healthcheck'",
  countryNotFound:
    "Country not found or doesn't have any cases. If you've used a full country name, try an ISO2 or ISO3 country code instead.",
  datapointNotFound:
    "Datapoint not found. Datapoint value has to be a specific string, e.g. 'cases', 'todayCases', 'deaths' or 'todayDeaths'. Camel, Pascal, snake or kebap case required.",
  invalidQuery:
    "Bad request: invalid query parameters. Only 1 query parameter with a key of 'datapoint' allowed.",
  methodNotAllowed:
    'HTTP request method not allowed. This service only accepts GET and HEAD requests.',
};

export default messages;
