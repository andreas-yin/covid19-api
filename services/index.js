import https from 'node:https';

const httpsGet = async (resolve, reject, url) => {
  https
    .get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          resolve({
            statusCode: res.statusCode,
            data: parsedData,
          });
        } catch (err) {
          reject(err);
        }
      });
    })
    .on('error', (err) => reject(err));
};

// Get COVID data for all countries from external API
export const allCountriesApi = async () => {
  return new Promise((resolve, reject) => {
    const url = 'https://disease.sh/v3/covid-19/all';
    httpsGet(resolve, reject, url);
  });
};

// Get country-based COVID data from external API
export const countryApi = async (country = '') => {
  return new Promise((resolve, reject) => {
    const url = 'https://disease.sh/v3/covid-19/countries/' + country;
    httpsGet(resolve, reject, url);
  });
};
