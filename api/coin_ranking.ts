import axios from "axios";

const instance = axios.create({
  headers: {
    "X-RapidAPI-Key": "02b543c3f4msh7e4ea7369286dd2p1ca22djsna0a85a8c69b4",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
  baseURL: "https://api.coinranking.com/v2",
});

export const requests = {
  fetchCoins: {
    url: "/coins",
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl", // USD currency
      timePeriod: "7d",
      orderBy: "marketCap",
      "tiers[0]": "1",
      orderDirection: "desc",
      limit: 50,
      offset: 0,
    },
  },
};

export default instance;
