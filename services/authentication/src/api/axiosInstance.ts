import axios, { AxiosInstance } from 'axios';

const getAxiosInstance = (url: string, header: any): AxiosInstance =>
  axios.create({
    headers: header,
    baseURL: url
  });

export default getAxiosInstance;
