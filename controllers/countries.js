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

const respondWith500 = (res) => {
  res.status(500).json({
    message: MESSAGES.INTERNAL_SERVER_ERROR,
  });
};

export const getCountries = async (req, res) => {
  try {
    const apiResponse = await allCountriesApi();

    // Internal server error if external API returns any errors
    if (apiResponse.statusCode !== 200) {
      return respondWith500(res);
    }

    return res.json(summarize(apiResponse));
  } catch {
    return respondWith500(res);
  }
};

export const getCountry = async (req, res) => {
  try {
    const { country } = req.params;

    // Covert all query parameter keys to lowercase
    const queryParams = Object.fromEntries(
      Object.entries(req.query).map(([key, value]) => [
        key.toLowerCase(),
        value,
      ])
    );

    const apiResponse = await countryApi(country);

    // External API cannot find country
    if (apiResponse.statusCode === 404) {
      return res.status(404).json({ message: MESSAGES.COUNTRY_NOT_FOUND });
    } else if (apiResponse.statusCode !== 200) {
      // Any other error from external API
      return respondWith500(res);
    }

    // No query parameters
    if (!Object.keys(queryParams).length) {
      const allDatapoints = {
        country: apiResponse.data.country,
        ...summarize(apiResponse),
      };
      return res.json(allDatapoints);
    }

    // Invalid query: query parameter key is not 'datapoint' or more than 1 query parameter
    const [queryParam] = Object.entries(queryParams);
    if (
      queryParam[0] !== 'datapoint' ||
      Object.keys(queryParams).length !== 1
    ) {
      return res.status(400).json({ message: MESSAGES.INVALID_QUERY });
    }

    // Value for 'datapoint' does not exist
    const camelCasedDatapoint = camelCase(queryParam[1]);
    if (apiResponse.data[camelCasedDatapoint] === undefined) {
      return res.status(404).json({ message: MESSAGES.DATAPOINT_NOT_FOUND });
    }

    res.json({ [camelCasedDatapoint]: apiResponse.data[camelCasedDatapoint] });
  } catch {
    return respondWith500(res);
  }
};
