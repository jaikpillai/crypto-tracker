import axios, { AxiosRequestConfig, CancelToken } from "axios";
import axiosRateLimit from "axios-rate-limit";

export class CoinRankingAPI {
  private url: string = ""; // url for NEXT_JS api -> pages/api
  private params: {} = {};
  private cancelToken: CancelToken | undefined = undefined;

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

  top5CoinsQuery(params?: {}) {
    this.url = "/coins";
    this.params = {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "7d",
      "tiers[0]": "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "5",
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

  getCurrencies(params?: {}) {
    this.url = "/reference-currencies";
    this.params = {
      offset: "0",
      limit: "10",
      ...params,
    };

    return { url: this.url, params: this.params, fetch: this.fetch };
  }

  getCoinHistoricalData(uuid: string, params?: {}) {
    this.url = `/coin/${uuid}/history`;
    this.params = {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      ...params,
    };
    return { url: this.url, params: this.params, fetch: this.fetch };
  }

  async fetch(config?: AxiosRequestConfig<any>): Promise<{ data: any }> {
    return await axiosLimited({
      url: this.url,
      params: this.params,
      ...config,
    });
  }
}

const axiosLimited = axiosRateLimit(
  axios.create({
    baseURL: "/api",
  }),
  {
    maxRequests: 5,
    perMilliseconds: 1000,
    maxRPS: 2,
  }
);

// const axiosInstance = axios.create({
//   baseURL: "/api",
// });

const backendAxiosInstance = axios.create({
  //   baseURL: "https://api.coinranking.com/v2",
  baseURL: "https://coinranking1.p.rapidapi.com",
});
export default backendAxiosInstance;
