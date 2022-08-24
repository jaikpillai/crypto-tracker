import axios, { AxiosRequestConfig, CancelToken } from "axios";
import axiosRateLimit from "axios-rate-limit";

export class CoinRankingAPI {
  private url: string = ""; // url for NEXT_JS api -> pages/api
  private params: {} = {};

  getAllCoins(queryParams?: {}) {
    this.url = "/coins";
    this.params = {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "7d",
      "tiers[0]": "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "50",
      ...queryParams,
    };

    return { url: this.url, params: this.params, fetch: this.fetch };
  }

  getTop5Coins(params?: {}) {
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

  getCoinDetails(uuid: string, params?: {}) {
    this.url = `/coin/${uuid}`;
    this.params = {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      ...params,
    };

    return { url: this.url, params: this.params, fetch: this.fetch };
  }

  getCurrencies(searchQuery?: string, params?: {}) {
    this.url = "/reference-currencies";
    this.params = {
      offset: "0",
      limit: "10",
      search: searchQuery,
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

  getExchanges(uuid: string, params?: {}) {
    this.url = `/coin/${uuid}/exchanges`;
    this.params = {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      orderDirection: "desc",
      limit: "50",
      ...params,
    };
    return { url: this.url, params: this.params, fetch: this.fetch };
  }

  getSearchSuggestions(query: string, params?: {}) {
    this.url = `/search-suggestions`;
    this.params = {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      orderDirection: "desc",
      limit: "50",
      query: query,
      ...params,
    };
    return { url: this.url, params: this.params, fetch: this.fetch };
  }

  async fetch(config?: AxiosRequestConfig<any>): Promise<{ data: any }> {
    return await axiosPublic({
      url: this.url,
      params: this.params,
      ...config,
    });
  }
}

// export const axiosPublic = axiosRateLimit(
//   axios.create({
//     headers: {
//       "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API || "",
//       "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
//     },
//     baseURL: "https://coinranking1.p.rapidapi.coms",
//   }),
//   {
//     maxRPS: 4,
//   }
// );
export const axiosPublic = axios.create({
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API || "",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
  baseURL: "https://coinranking1.p.rapidapi.com",
});
export default CoinRankingAPI;
