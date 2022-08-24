import { Dialog } from "@headlessui/react";
import { useCurrency } from "../../hooks";
import Image from "next/image";

interface ICurrencyDialog {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CurrencyDialog: React.FunctionComponent<ICurrencyDialog> = ({
  isOpen,
  setIsOpen,
}) => {
  const { currency, setCurrency, setQuery, currencyList, loading } =
    useCurrency();

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0  flex items-center justify-center p-4 backdrop-blur-sm">
        <Dialog.Panel className=" w-full lg:w-[58rem]  rounded bg-slate-800 p-4 shadow-lg overflow-y-auto ">
          <Dialog.Title className={" flex flex-col gap-2 justify-between"}>
            <div className="flex font-bold text-white   justify-between">
              <div className="text-xl flex gap-2">
                <p>Choose Currency</p>
                {loading && (
                  <div className="flex items-center justify-center ">
                    <div className="w-4 h-4 border-b-2 border-gray-500 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              {/* Close button */}
              <button onClick={() => setIsOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <label className="relative w-full mt-2">
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
              <input
                className="pl-10 w-full bg-gray-900 p-2 rounded-md text-sm placeholder:opacity-40 text-neutral-100"
                placeholder="Search Fiat or Cryptocurrency"
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                name=""
                id=""
              />
            </label>
          </Dialog.Title>
          <br />

          {/* Selected Currency */}
          <div className="flex flex-col gap-2">
            <p className="font-bold text-gray-500 text-sm"> Selected</p>

            <div className="w-1/2">
              <div
                className={`p-2 rounded-lg hover:bg-slate-900  ${
                  currency?.uuid === currency?.uuid && "bg-slate-900 "
                }`}
                key={currency?.uuid}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <div className="flex gap-2 items-center cursor-pointer">
                  <div className="w-10 h-5 flex">
                    {currency?.iconUrl ? (
                      <Image
                        alt={`${currency.name}`}
                        className=""
                        objectFit="contain"
                        height={30}
                        width={30}
                        src={currency.iconUrl || "/"}
                      />
                    ) : (
                      <p className=" text-xs text-gray-200 pl-2 pr-2 pt-1 pb-1 rounded-md">
                        {currency?.symbol}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between items-center gap-2 w-full">
                    <div>
                      <p className="text-neutral-100 text-sm">
                        {" "}
                        {currency?.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {" "}
                        {currency?.symbol} - {currency?.sign}
                      </p>
                    </div>
                    {currency?.uuid === currency?.uuid && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 fill-green-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />

          <div className="max-h-[15rem]  grid grid-cols-2  gap-2 lg:grid-cols-4 overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {currencyList
              ?.filter((e) => e.uuid !== currency?.uuid)
              .map((cur) => {
                return (
                  <div
                    className={`p-2 rounded-lg  hover:bg-slate-900 border border-gray-900/50 cursor-pointer ${
                      currency?.uuid === cur.uuid && "bg-slate-900 "
                    }`}
                    key={cur.uuid}
                    onClick={() => {
                      setCurrency(cur);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex gap-2 items-center ">
                      <div className="w-10 h-5 flex">
                        {cur?.iconUrl ? (
                          <Image
                            alt={`${cur.name}`}
                            className=""
                            objectFit="contain"
                            height={30}
                            width={30}
                            src={cur.iconUrl || "/"}
                          />
                        ) : (
                          <p className=" text-xs scale-75 text-gray-400 bg-gray-900 pl-2 pr-2 pt-1 pb-1 rounded-md flex items-center">
                            {cur.symbol}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-between items-center gap-2 w-full">
                        <div>
                          <p className="text-neutral-100 text-xs">
                            {" "}
                            {cur.name}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {" "}
                            {cur.symbol} - {cur.sign}
                          </p>
                        </div>
                        {currency?.uuid === cur.uuid && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 fill-green-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
