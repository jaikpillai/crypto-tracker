import "../styles/globals.scss";
// import "melt-components/dist/tailwind.css";

import type { AppProps } from "next/app";
import { CurrencyProvider } from "../contexts/CurrencyContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CurrencyProvider>
      <Component {...pageProps} />
    </CurrencyProvider>
  );
}

export default MyApp;
