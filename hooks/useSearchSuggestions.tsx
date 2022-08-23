import { useState } from "react";
import CoinRankingAPI, { Coin } from "../remote_api/CoinRanking";
import { useCurrency } from "./useCurrency";

export const useSearchSuggestions = () => {
  const [suggestionList, setSuggestionList] = useState<Coin[]>();
  const { currency } = useCurrency();

  const fetchSearchSuggestion = async (query: string, signal?: AbortSignal) => {
    try {
      let result = await new CoinRankingAPI()
        .getSearchSuggestions(query, {
          referenceCurrencyUuid: currency?.uuid,
        })
        .fetch({ signal: signal });

      setSuggestionList(result.data.data.coins);
    } catch (e) {}
  };

  return { suggestionList, fetchSearchSuggestion };
};
