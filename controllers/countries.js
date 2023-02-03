import getDataFromExternalApi from '../services/index.js';
import camelCase from 'lodash.camelcase';

const getCountriesData = async (req, res) => {
  try {
    const { country } = req.params;
    const data = await getDataFromExternalApi(country);
    console.log(data);
    res.json(data);
  } catch (err) {
    console.error(err.message);
  }
};

const getCountryData = async (req, res) => {
  try {
    const { country } = req.params;
    let { datapoint } = req.query;
    datapoint = camelCase(datapoint);

    const data = await getDataFromExternalApi(country);

    /*
    Requests with a query parameter of 'datapoint' following the country 
    receive the specified datapoint only.
    E.g. /countries/Germany?datapoint=today-cases 
    returns today's cases in Germany only
    */
    datapoint ? res.json({ [datapoint]: data[datapoint] }) : res.json(data);
  } catch (err) {
    console.error(err.message);
  }
};

const methodNotAllowed = (req, res, next) => {
  res.status(405).set('Allow', 'GET, HEAD').send('Not Acceptable');
};

export { getCountriesData, getCountryData, methodNotAllowed };
