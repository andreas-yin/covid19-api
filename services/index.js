import https from 'node:https';

export default getDataFromExternalApi = async (country = '') => {
  return new Promise((resolve, reject) => {
    const url = 'https://disease.sh/v3/covid-19/countries/' + country;

    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (err) {
            reject(err);
          }
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};
