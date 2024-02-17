import { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { request } from "@utils/request";

export const fetchResponseToServiceData = (
  res: AxiosResponse,
  model: string
) => {
  return res.data?.[model];
};

export const serviceFetch = async (
  options: AxiosRequestConfig,
  model?: string
) => {
  const res = await request(options);
  if (!model) {
    return res?.data;
  }
  return fetchResponseToServiceData(res, model);
};
