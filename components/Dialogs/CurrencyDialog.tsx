import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
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
  const { currency, setCurrency, fetchCurrencies, currencyList } =
    useCurrency();

  useEffect(() => {
    if (isOpen && currencyList.length == 0) {
      fetchCurrencies({ limit: "30" });
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 bottom-40 flex items-center justify-center p-4 backdrop-blur-sm">
        <Dialog.Panel className=" w-full lg:w-3/5  rounded bg-slate-800 p-4 shadow-lg">
          <Dialog.Title className={"font-bold text-white flex justify-between"}>
            <p className="text-xl"> Choose Currency</p>

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
          </Dialog.Title>
          {/* <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description>

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p> */}
          <br />
          <div className="max-h-[22rem] grid grid-cols-2 gap-2 lg:grid-cols-4 overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {currencyList?.map((cur) => {
              return (
                <div
                  className={`p-2 rounded-lg hover:bg-slate-900  ${
                    currency.uuid === cur.uuid && "bg-slate-900 "
                  }`}
                  key={cur.uuid}
                  onClick={() => {
                    setCurrency(cur);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex gap-2 items-center cursor-pointer">
                    <div className="w-10 h-5 flex">
                      {cur?.iconUrl ? (
                        <Image
                          className=""
                          objectFit="contain"
                          height={30}
                          width={30}
                          src={cur.iconUrl || "/"}
                        />
                      ) : (
                        <p className=" text-xs text-gray-200 pl-2 pr-2 pt-1 pb-1 rounded-md">
                          {cur.symbol}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-between items-center gap-2 w-full">
                      <div>
                        <p className="text-neutral-100 text-sm"> {cur.name}</p>
                        <p className="text-xs text-neutral-500">
                          {" "}
                          {cur.symbol} - {cur.sign}
                        </p>
                      </div>
                      {currency.uuid === cur.uuid && (
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
