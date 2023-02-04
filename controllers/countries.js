import { allCountriesApi, countryApi } from '../services/index.js';
import camelCase from 'lodash.camelcase';
import * as MESSAGES from '../constants/messages.js';

const summarize = (apiResponse) => {
  const summary = {};
  const datapoints = ['cases', 'todayCases', 'deaths', 'todayDeaths'];

  for (const datapoint of datapoints) {
    summary[datapoint] =
      apiResponse.data[datapoint] === undefined
        ? null
        : apiResponse.data[datapoint];
  }
  return summary;
};

export const getCountries = async (req, res) => {
  const apiResponse = await allCountriesApi();

  // If we receive any error from the external API
  if (apiResponse.statusCode !== 200) {
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
  return res.json(summarize(apiResponse));
};

export const getCountry = async (req, res) => {
  const { country } = req.params;

  // Covert all query parameter keys to lowercase
  const queryParams = Object.fromEntries(
    Object.entries(req.query).map(([key, value]) => [key.toLowerCase(), value])
  );

  const apiResponse = await countryApi(country);

  // If external API cannot find country
  if (apiResponse.statusCode === 404) {
    return res.status(404).json({ message: MESSAGES.COUNTRY_NOT_FOUND });
  } else if (apiResponse.statusCode !== 200) {
    // If we receive any other error from the external API
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }

  const summary = summarize(apiResponse);

  // No query parameters
  if (!Object.keys(queryParams).length) {
    const summaryIncludingCountry = {
      country: apiResponse.data.country,
      ...summary,
    };
    return res.json(summaryIncludingCountry);
  }

  // Invalid query: query parameter key is not 'datapoint' or more than 1 query parameter
  const [queryParam] = Object.entries(queryParams);
  if (queryParam[0] !== 'datapoint' || Object.keys(queryParams).length !== 1) {
    return res.status(400).json({ message: MESSAGES.INVALID_QUERY });
  }

  // Value for 'datapoint' does not exist
  const camelCasedDatapoint = camelCase(queryParam[1]);
  if (summary[camelCasedDatapoint] === undefined) {
    return res.status(404).json({ message: MESSAGES.DATAPOINT_NOT_FOUND });
  }

  res.json({ [camelCasedDatapoint]: apiResponse.data[camelCasedDatapoint] });
};
