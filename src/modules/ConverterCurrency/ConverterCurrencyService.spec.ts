import { ConverterCurrencyService } from './ConverterCurrencyService';
import dotenv from 'dotenv';
dotenv.config();

jest.setTimeout(30000);

describe('ConverterCurrencyService', () => {
  const apikey = process.env.API_KEY;
  afterEach(() => {
    process.env.API_KEY = apikey;
  });
  it('should return a object "query" and result from request', async () => {
    const converterService = new ConverterCurrencyService();
    const response = await converterService.converterCurrency('EUR', 'GBP', 10);
    expect(response.query).toHaveProperty('to');
    expect(response.query).toHaveProperty('from');
    expect(response.query).toHaveProperty('amount');
    expect(response).toHaveProperty('result');
  });
  it('should throw a error with invalid to request', async () => {
    const converterService = new ConverterCurrencyService();
    const throwError = async () => {
      await converterService.converterCurrency('EUROPA', 'GBP', 10);
    };
    expect(throwError).rejects.toThrowError();
  });
  it('should throw a error with invalid from request', async () => {
    const converterService = new ConverterCurrencyService();
    const throwError = async () => {
      await converterService.converterCurrency('EUR', 'LIBRA', 10);
    };
    expect(throwError).rejects.toThrowError();
  });
  it('should throw a error with invalid amount request', async () => {
    const converterService = new ConverterCurrencyService();
    const throwError = async () => {
      await converterService.converterCurrency('EUR', 'GBP', -10);
    };
    expect(throwError).rejects.toThrowError();
  });
});
