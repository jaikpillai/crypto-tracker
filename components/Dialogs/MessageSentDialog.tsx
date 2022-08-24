import { Dialog } from "@headlessui/react";
import { useCurrency } from "../../hooks";
import Image from "next/image";

interface ICurrencyDialog {
  isOpen: boolean;
  message: { title: string; message: string };
  onClose: (isOpen: boolean) => void;
}

export const MessageSentDialog: React.FunctionComponent<ICurrencyDialog> = ({
  isOpen,
  onClose,
  message,
}) => {
  const { currency, setCurrency, setQuery, currencyList, loading } =
    useCurrency();

  return (
    <Dialog open={isOpen} onClose={() => onClose(false)}>
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0  flex items-center justify-center p-4 backdrop-blur-sm">
        <Dialog.Panel className="absolute top-40 w-2/3 md:w-1/2 lg:w-[28rem]  rounded bg-slate-800 p-4 shadow-lg overflow-y-auto ">
          <Dialog.Title className={" flex flex-col gap-2 justify-between"}>
            <div className="flex font-bold text-white   justify-between">
              <div className="text-xl flex gap-2">
                <p>{message.title}</p>
                {loading && (
                  <div className="flex items-center justify-center ">
                    <div className="w-4 h-4 border-b-2 border-gray-500 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              {/* Close button */}
              <button onClick={() => onClose(false)}>
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
          </Dialog.Title>
          <br />

          {/* Selected Currency */}
          <div className="flex flex-col gap-2">
            <p className="font-bold text-gray-300 text-sm">{message.message}</p>
          </div>
          <br />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
