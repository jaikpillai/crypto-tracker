import { useRouter } from "next/router";
import { useState } from "react";
import { useCurrency } from "../../hooks";
import { CurrencyDialog } from "../Dialogs";
import { SearchCoins } from "../SearchCoins";
import { Triangle } from "../Shapes";
import appInfo from "../../general";

export const ToolbarHeader: React.FunctionComponent = () => {
  const { currency } = useCurrency();

  const [isCurrencyDialogOpen, setIsCurrencyDialogOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="absolute w-full h-12 bg-black/30 z-40 backdrop-blur-sm flex justify-between items-center gap-4 xl:px-60 px-5 border-b border-b-white/30">
      {/* Home Icon */}
      <button className="text-white" onClick={() => router.push("/")}>
        {appInfo.app_name}
      </button>

      <div className="flex justify-start gap-5 ">
        {/* Currency Select */}
        <button
          className="text-white flex items-center justify-center gap-2"
          onClick={() => setIsCurrencyDialogOpen(true)}
        >
          {isCurrencyDialogOpen && (
            <CurrencyDialog
              isOpen={isCurrencyDialogOpen}
              setIsOpen={(e) => setIsCurrencyDialogOpen(e)}
            />
          )}
          <span className="flex items-center gap-1">
            <p>{currency?.sign}</p>
            <p> {currency?.symbol}</p>
          </span>

          <Triangle direction="bottom" h={6} w={8} color="fill-white" />
        </button>

        <SearchCoins />
      </div>
    </div>
  );
};
