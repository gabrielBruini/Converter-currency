import axios, { AxiosInstance } from 'axios';

export function createAxiosInstance(
  to: string,
  from: string,
  amount: number,
): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
  });
  axiosInstance.defaults.headers.common['apikey'] = process.env.API_KEY;

  return axiosInstance;
}
