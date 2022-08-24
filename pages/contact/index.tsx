import { NextPage } from "next";
import Head from "next/head";
import ContactForm from "../../components/ContactForm";
import appInfo from "../../general";
const parse = require("html-react-parser");

const Contact: NextPage = () => {
  return (
    <div className="h-full w-full md:px-5 px-2 xl:px-60 py-20  bg-gradient-to-t from-black/50 via-gray-800/70 to-gray-800/50 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent ">
      <Head>
        <title>Contact </title>
      </Head>
      <ContactForm />
    </div>
  );
};

export default Contact;
