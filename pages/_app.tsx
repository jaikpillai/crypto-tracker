import "../styles/globals.scss";
// import "melt-components/dist/tailwind.css";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Progress } from "../components/Progress";
import { useRouterProgress } from "../hooks";

import type { AppProps } from "next/app";
import { CurrencyProvider } from "../contexts/CurrencyContext";
import { ToolbarHeader } from "../components/Header/ToolbarHeader";
import { Footer } from "../components/Footer.tsx";

function MyApp({ Component, pageProps }: AppProps) {
  const { animating, setIsAnimating } = useRouterProgress();
  const router = useRouter();
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };
    const handleStop = () => {
      setIsAnimating(false);
      const app = windowRef.current;
      if (app) {
        app.scrollTo({
          top: 0,
          left: 0,
        });
      }
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <CurrencyProvider>
      <Progress isAnimating={animating} />
      <ToolbarHeader />
      <div
        className="w-screen h-screen overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
        ref={windowRef}
      >
        <Component {...pageProps} />
        <Footer />
      </div>
    </CurrencyProvider>
  );
}

export default MyApp;
