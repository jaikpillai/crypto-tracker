import { Coin } from "../../remote_api/CoinRanking";
import { useRouter } from "next/router";
import Image from "next/image";
import { CoinCardTemplate, CoinCard } from "../Cards";

interface IHeader {
  headingText: string;
  subHeading?: string;
  callToAction?: { text: string; link: string };
  top5Coins: Coin[] | undefined;
}

export const Header: React.FunctionComponent<IHeader> = ({
  headingText,
  subHeading,
  callToAction,
  top5Coins,
}) => {
  const router = useRouter();

  return (
    <div className="border-b border-gray-700 relative pt-20 pb-20 shadow-md flex flex-col items-center justify-center w-full min-h-[20rem]  p-4 gap-4">
      <div className="absolute object-center  inset-0 bg-black ">
        <Image
          alt={`Header Image`}
          className=" object-center opacity-60"
          objectFit="cover"
          src={"/header_bg.jpg"}
          layout="fill"
        />
      </div>
      <h1 className="relative text-2xl lg:text-4xl font-bold text-white">
        {headingText}
      </h1>
      <h2 className="relative lg:text-xl text-neutral-300">{subHeading}</h2>
      <br />
      {/* Top 5 Coins List */}
      <div className="flex gap-3 flex-wrap items-center justify-center">
        {top5Coins ? (
          top5Coins?.map((coin) => {
            return (
              <CoinCard
                onClick={() => router.push(`/coin/${coin.uuid}`)}
                key={coin.uuid}
                coin={coin}
              />
            );
          })
        ) : (
          <>
            {[...Array(5)].map((e, i) => {
              return <CoinCardTemplate key={i} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};
