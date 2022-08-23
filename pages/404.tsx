import { NextPage } from "next";
import { useRouter } from "next/router";

const Error404: NextPage = () => {
  const router = useRouter();
  return (
    <div className="h-screen py-40 px-10 w-full flex flex-col gap-10 items-center bg-neutral-800 bg-gradient-to-t from-gray-800 via-gray-800 to-gray-800 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
      <p className="text-white font-bold text-lg lg:text-2xl xl:text-4xl text-center">
        Looks like you&apos;ve gone too deep in the blockchain
      </p>
      <button
        onClick={() => router.push("/")}
        className="bg-primary-500 text-black p-2 rounded-md"
      >
        Go to homepage
      </button>
    </div>
  );
};

export default Error404;
