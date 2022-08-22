import { useEffect, useState } from "react";
import { Coin, CoinRankingAPI } from "../remote_api/CoinRanking";
import { axiosPublic } from "../remote_api/CoinRanking/CoinRanking";
import { useCurrency } from "./useCurrency";

export const useSearchSuggestions = () => {
  const [suggestionList, setSuggestionList] = useState<Coin[]>();
  const { currency } = useCurrency();

  const fetchSearchSuggestion = async (
    query: string,
    _signal?: AbortSignal
  ) => {
    let _coins = await axiosPublic({
      url: "/search-suggestions",
      params: { referenceCurrencyUuid: currency?.uuid, query: query },
      signal: _signal,
    });
    setSuggestionList(_coins.data.data.coins);
  };

  return { suggestionList, fetchSearchSuggestion };
};
