/* eslint-disable no-undef */
import { jest } from '@jest/globals';
import { createGetCountries, createGetCountry } from './countries';
import * as MESSAGES from '../constants/messages';

const allCountriesApi = jest.fn();
const countryApi = jest.fn();

const getCountries = createGetCountries(allCountriesApi);
const getCountry = createGetCountry(countryApi);

describe('The getCountries controller', () => {
  beforeEach(() => {
    allCountriesApi.mockReset();
  });

  it('should respond with HTTP 500 if the external API gives us an error', async () => {
    const mApiReponse = { statusCode: 500, data: {} };
    allCountriesApi.mockResolvedValue(mApiReponse);
    const mReq = {};
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await getCountries(mReq, mRes);
    expect(allCountriesApi).toHaveBeenCalled();
    expect(mRes.status).toHaveBeenCalledWith(500);
    expect(mRes.json).toHaveBeenCalledWith({
      message: MESSAGES.INTERNAL_SERVER_ERROR,
    });
  });

  it("should respond with a summary of the external API's data if the API is working", async () => {
    const mSummary = {
      cases: 7000,
      todayCases: 0,
      deaths: 1000,
      todayDeaths: 0,
    };
    const mApiReponse = {
      statusCode: 200,
      data: { ...mSummary, recovered: 5000 },
    };
    allCountriesApi.mockResolvedValue(mApiReponse);
    const mReq = {};
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await getCountries(mReq, mRes);
    expect(allCountriesApi).toHaveBeenCalled();
    expect(mRes.status).toHaveBeenCalledWith(200);
    expect(mRes.json).toHaveBeenCalledWith(mSummary);
  });
});

describe('The getCountry controller', () => {
  beforeEach(() => {
    countryApi.mockReset();
  });

  it("should respond with HTTP 404 if the external API can't find the country", async () => {
    const mApiResponse = { statusCode: 404, data: {} };
    countryApi.mockResolvedValue(mApiResponse);
    const mReq = { params: { country: 'blabla' }, query: {} };
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await getCountry(mReq, mRes);
    expect(countryApi).toHaveBeenCalled();
    expect(mRes.status).toHaveBeenCalledWith(404);
    expect(mRes.json).toHaveBeenCalledWith({
      message: MESSAGES.COUNTRY_NOT_FOUND,
    });
  });

  it('should respond with HTTP 500 if the external API gives us an error', async () => {
    const mApiResponse = { statusCode: 500, data: {} };
    countryApi.mockResolvedValue(mApiResponse);
    const mReq = { params: { country: 'Germany' }, query: {} };
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await getCountry(mReq, mRes);
    expect(countryApi).toHaveBeenCalled();
    expect(mRes.status).toHaveBeenCalledWith(500);
    expect(mRes.json).toHaveBeenCalledWith({
      message: MESSAGES.INTERNAL_SERVER_ERROR,
    });
  });

  it('should respond with the whole country summary if no query parameters', async () => {
    const mSummary = {
      country: 'Germany',
      cases: 9000,
      todayCases: 0,
      deaths: 700,
      todayDeaths: 0,
    };
    const mApiResponse = {
      statusCode: 200,
      data: { ...mSummary, recovered: 5000 },
    };
    countryApi.mockResolvedValue(mApiResponse);
    const mReq = { params: { country: 'de' }, query: {} };
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await getCountry(mReq, mRes);
    expect(countryApi).toHaveBeenCalled();
    expect(mRes.status).toHaveBeenCalledWith(200);
    expect(mRes.json).toHaveBeenCalledWith(mSummary);
  });

  it('should respond with HTTP 400 if query parameter key is not "datapoint"', async () => {
    const mApiResponse = { statusCode: 200, data: {} };
    countryApi.mockResolvedValue(mApiResponse);
    const mReq = { params: { country: 'de' }, query: { something: 'hello' } };
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await getCountry(mReq, mRes);
    expect(countryApi).toHaveBeenCalled();
    expect(mRes.status).toHaveBeenCalledWith(400);
    expect(mRes.json).toHaveBeenCalledWith({ message: MESSAGES.INVALID_QUERY });
  });

  it('should respond with HTTP 400 if more than 1 query parameter', async () => {
    const mApiResponse = { statusCode: 200, data: {} };
    countryApi.mockResolvedValue(mApiResponse);
    const mReq = {
      params: { country: 'de' },
      query: { datapoint: 'todayCases', something: 'hello' },
    };
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await getCountry(mReq, mRes);
    expect(countryApi).toHaveBeenCalled();
    expect(mRes.status).toHaveBeenCalledWith(400);
    expect(mRes.json).toHaveBeenCalledWith({ message: MESSAGES.INVALID_QUERY });
  });

  it("should respond with HTTP 404 if datapoint doesn't exist", async () => {
    const mApiResponse = {
      statusCode: 200,
      data: {
        country: 'Germany',
        cases: 9000,
        todayCases: 0,
        deaths: 700,
        todayDeaths: 0,
        recovered: 5000,
      },
    };
    countryApi.mockResolvedValue(mApiResponse);
    const mReq = {
      params: { country: 'de' },
      query: { datapoint: 'todaycases' },
    };
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await getCountry(mReq, mRes);
    expect(countryApi).toHaveBeenCalled();
    expect(mRes.status).toHaveBeenCalledWith(404);
    expect(mRes.json).toHaveBeenCalledWith({
      message: MESSAGES.DATAPOINT_NOT_FOUND,
    });
  });

  it('should respond with a single datapoint if it exists in the summary', async () => {
    const mApiResponse = {
      statusCode: 200,
      data: { todayDeaths: 0 },
    };
    countryApi.mockResolvedValue(mApiResponse);
    const mReq = {
      params: { country: 'de' },
      query: { datapoint: 'today-deaths' },
    };
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await getCountry(mReq, mRes);
    expect(countryApi).toHaveBeenCalled();
    expect(mRes.status).toHaveBeenCalledWith(200);
    expect(mRes.json).toHaveBeenCalledWith(mApiResponse.data);
  });
});
