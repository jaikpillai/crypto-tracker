import { NextPage } from "next";
import Head from "next/head";
import appInfo from "../../general";
const parse = require("html-react-parser");

const About: NextPage = () => {
  return (
    <div className="h-full w-full md:px-5 px-2 xl:px-60 py-20  bg-gradient-to-t from-black/50 via-gray-800/70 to-gray-800/50 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent ">
      <Head>
        <title>About {appInfo.app_name}</title>
      </Head>
      <div className="flex flex-col items-center gap-2">
        <p className="text-gray-500 font-bold text-2xl">
          About {appInfo.app_name}
        </p>
        <article className="prose mt-5  prose-strong:text-gray-200 prose-p:text-gray-200 prose-a:text-primary-400">
          {parse(appInfo.description)}
        </article>
      </div>
    </div>
  );
};

export default About;
