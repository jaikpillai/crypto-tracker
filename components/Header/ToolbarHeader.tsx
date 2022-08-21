import { useRouter } from "next/router";
import { useState } from "react";
import { useCurrency } from "../../hooks";
import { US_DOLLAR_CURRENCY, INR_CURRENCY } from "../../remote_api/CoinRanking";
import { CurrencyDialog } from "../Dialogs";
export const ToolbarHeader: React.FunctionComponent = () => {
  const { setCurrency } = useCurrency();

  const [isCurrencyDialogOpen, setIsCurrencyDialogOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="absolute w-full h-12 bg-black/30 z-40 backdrop-blur-sm flex justify-between gap-4 lg:px-60 px-5">
      <button className="text-white" onClick={() => router.push("/")}>
        HOME
      </button>
      <button className="text-white" onClick={() => setCurrency(INR_CURRENCY)}>
        INR
      </button>
      <button
        className="text-white"
        onClick={() => setIsCurrencyDialogOpen(true)}
      >
        {isCurrencyDialogOpen && (
          <CurrencyDialog
            isOpen={isCurrencyDialogOpen}
            setIsOpen={(e) => setIsCurrencyDialogOpen(e)}
          />
        )}
        Curre
      </button>
    </div>
  );
};
