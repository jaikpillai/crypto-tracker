import { useRouter } from "next/router";
import { useState } from "react";
import { useCurrency } from "../../hooks";
import { US_DOLLAR_CURRENCY, INR_CURRENCY } from "../../remote_api/CoinRanking";
import { CurrencyDialog } from "../Dialogs";
import { SearchCoins } from "../SearchCoins";
import { Triangle } from "../Shapes";
export const ToolbarHeader: React.FunctionComponent = () => {
  const { currency, setCurrency } = useCurrency();

  const [isCurrencyDialogOpen, setIsCurrencyDialogOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="fixed w-full h-12 bg-black/30 z-40 backdrop-blur-sm flex justify-between items-center gap-4 lg:px-60 px-5 border-b border-b-white/30">
      {/* Home Icon */}
      <button className="text-white" onClick={() => router.push("/")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className="flex justify-start gap-5 ">
        {/* Currency Select */}
        <button
          className="text-white flex items-center gap-2"
          onClick={() => setIsCurrencyDialogOpen(true)}
        >
          {isCurrencyDialogOpen && (
            <CurrencyDialog
              isOpen={isCurrencyDialogOpen}
              setIsOpen={(e) => setIsCurrencyDialogOpen(e)}
            />
          )}
          {currency?.sign}
          {currency?.symbol}
          <Triangle direction="bottom" h={6} w={8} color="fill-white" />
        </button>

        <SearchCoins />
      </div>
    </div>
  );
};
