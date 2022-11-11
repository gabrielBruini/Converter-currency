import InvalidArgumentError from '@/exceptions/InvalidArgumentError';
import { createAxiosInstance } from '@/utils/https';
import { AxiosResponse } from 'axios';
import { createConnection } from '../../utils/database/database';
import { v4 as uuidv4 } from 'uuid';

export type AxiosResponseCurrency = {
  sucess: boolean;
  query: { from: string; to: string; amount: number };
  info: { timestamp: number; rate: number };
  date: string;
  result: number;
  message?: string;
};

export type errorAxios = {
  error: { code: string; message: string };
};

export type Result = {
  query: { from: string; to: string; amount: number };
  result: number;
};

export class ConverterCurrencyService {
  public async converterCurrency(
    to: string,
    from: string,
    amount: number,
  ): Promise<Result> {
    try {
      const data = await createConnection();
      const axiosResponse: AxiosResponse<AxiosResponseCurrency> =
        await createAxiosInstance(to, from, amount).get('');
      await data
        .get('Currency')
        .push({
          query: { to, from, amount },
          id: uuidv4(),
          result: axiosResponse.data.result,
        })
        .write();
      return {
        query: axiosResponse.data.query,
        result: axiosResponse.data.result,
      };
    } catch (e) {
      throw new InvalidArgumentError(`${e.response.data.error.message}`);
    }
  }
}
