import { Combobox } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSearchSuggestions } from "../../hooks";
import { Coin } from "../../remote_api/CoinRanking";

export const SearchCoins = () => {
  const { suggestionList, fetchSearchSuggestion } = useSearchSuggestions();
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    if (query.length > 0) {
      fetchSearchSuggestion(query, controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <div>
      {/* <input
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        name=""
        id=""
      /> */}

      <Combobox value={""} onChange={() => {}}>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 stroke-neutral-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <Combobox.Input
            className="pl-10 w-full bg-gray-700 p-2 rounded-md text-sm placeholder:opacity-40 text-neutral-100"
            placeholder="Search Coin"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(coin: Coin) => coin.name}
          />
        </div>
        <Combobox.Options className="absolute overflow-hidden shadow-lg rounded-md bg-gray-900   divide-y divide-gray-700">
          {suggestionList?.map((coin) => (
            <Combobox.Option key={coin.uuid} value={coin.uuid}>
              <Combobox.Button
                as="button"
                onClick={() =>
                  router.push(`/coin/${coin.uuid}`, "", { shallow: false })
                }
                className="p-2   border-slate-700 hover:bg-gray-800 cursor-pointer w-full"
              >
                <a className="flex items-center gap-4 w-full">
                  <Image
                    className=""
                    objectFit="contain"
                    height={20}
                    width={20}
                    src={coin.iconUrl?.split("?")[0] || "/"}
                  />

                  <p className="text-left text-xs truncate text-white">
                    {coin.name}
                  </p>
                  <p className="bg-gray-600 pl-2 pr-2 pt-px pb-px rounded-md text-left text-[0.6rem] truncate text-gray-300">
                    {coin.symbol}
                  </p>
                </a>
              </Combobox.Button>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};
