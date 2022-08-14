export { default } from "./CoinRanking";
export { CoinRankingAPI } from "./CoinRanking";

export interface CoinsQueryResponse {
  data: {
    stats: CoinsStats;
    coins: Coin[];
  };
}

export interface Coin {
  uuid: string; // UUID of the coin
  symbol: string; //Currency symbol
  name: string; //Name of the coin
  color: string; //Main HEX color of the coin
  iconUrl: string; //Location of the icon image
  "24hVolume": string; //24h trade volume
  marketCap: string; //Market capitalization. Price times circulating supply
  price: string; //	Price of the coin
  btcPrice: string; //Price of the coin expressed in Bitcoin
  listedAt: number | null; //Epoch timestamp of when we started listing the coin.
  change: string; //Percentage of change over the given time period
  rank: number; //The position in the ranks
  sparkline: string[]; //Array of prices based on the time period parameter, useful for a sparkline
  coinrankingUrl: string; //Where to find the coin on coinranking.com
}

export interface DetailedCoin extends Coin {
  allTimeHigh: { price: string; timestamp: number };
  description: string;
  links: { name: string; type: string; url: string }[];
  lowVolume: false;
  numberOfExhanges: number;
  numberOfMarkets: number;
  priceAt: number;
  supply: { circulating: string; confirmed: boolean; total: string };
  websiteUrl: string;
}

export interface CoinsStats {
  total: number;
  totalCoins: number;
  totalMarkets: number;
  totalExchanges: number;
  totalMarketCap: string;
  total24hVolume: string;
}
