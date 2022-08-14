import axios, { AxiosRequestConfig } from "axios";

export class CoinRankingAPI {
  private url: string = ""; // url for NEXT_JS api -> pages/api
  private params: {} = {};

  allCoinsQuery(params?: {}) {
    this.url = "/coins";
    this.params = {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "7d",
      "tiers[0]": "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "50",
      ...params,
    };

    return { url: this.url, params: this.params, fetch: this.fetch };
  }

  coinDetailsQuery(uuid: string, params?: {}) {
    this.url = `/coin/${uuid}`;
    this.params = {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      ...params,
    };

    return { url: this.url, params: this.params, fetch: this.fetch };
  }

  async fetch(config?: AxiosRequestConfig<any>): Promise<{ data: any }> {
    return await axiosInstance({
      url: this.url,
      params: this.params,
      ...config,
    });
  }
}

const backendAxiosInstance = axios.create({
  headers: {
    // "x-access-token": process.env.COINRANKING_APIKEY || "",
    "X-RapidAPI-Key": process.env.RAPID_API || "",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
  //   baseURL: "https://api.coinranking.com/v2",
  baseURL: "https://coinranking1.p.rapidapi.com",
});

const axiosInstance = axios.create({
  baseURL: "/api",
});

export default backendAxiosInstance;
