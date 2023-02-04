import getDataFromExternalApi from '../services/index.js';
import camelCase from 'lodash.camelcase';
import messages from '../utils/messages.js';

// Helper
const respondWith503 = (res) => {
  res.status(503).json({
    message: messages['unavailable'],
  });
};

const getCountriesData = async (req, res) => {
  try {
    const apiResponse = await getDataFromExternalApi();

    // Service unavailable if external API returns any errors
    if (apiResponse.statusCode !== 200) {
      return respondWith503(res);
    }
    return res.json(apiResponse.data);
  } catch {
    return respondWith503(res);
  }
};

const getCountryData = async (req, res) => {
  try {
    const { country } = req.params;

    // Covert all query parameter keys to lowercase
    const queryParams = Object.fromEntries(
      Object.entries(req.query).map(([key, value]) => [
        key.toLowerCase(),
        value,
      ])
    );

    const apiResponse = await getDataFromExternalApi(country);

    // External API cannot find country
    if (apiResponse.statusCode === 404) {
      return res.status(404).json({ message: messages['countryNotFound'] });
    } else if (apiResponse.statusCode !== 200) {
      // Any other error from external API
      return respondWith503(res);
    }

    // No query parameters
    if (!Object.keys(queryParams).length) {
      return res.json(apiResponse.data);
    }

    // Invalid query: query parameter key is not 'datapoint' or more than 1 query parameter
    const [queryParam] = Object.entries(queryParams);
    if (
      queryParam[0] !== 'datapoint' ||
      Object.keys(queryParams).length !== 1
    ) {
      return res.status(400).json({ message: messages['invalidQuery'] });
    }

    // Value for 'datapoint' does not exist
    const camelCasedDatapoint = camelCase(queryParam[1]);
    if (apiResponse.data[camelCasedDatapoint] === undefined) {
      return res.status(404).json({ message: messages['datapointNotFound'] });
    }

    res.json({ [camelCasedDatapoint]: apiResponse.data[camelCasedDatapoint] });
  } catch {
    return respondWith503(res);
  }
};

export { getCountriesData, getCountryData };
