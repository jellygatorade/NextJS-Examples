// Just as an example to use this with a root '_app.js' of Next.js

import "@/styles/globals.css";

import Layout from "../components/layout/layout";

import TimeoutModal from "../two-tiered-timeout-context/components/TimeoutModal";
import TimeoutControls from "../two-tiered-timeout-context/components/TimeoutControls";
import { TimeoutContextProvider } from "../two-tiered-timeout-context/timeout-context/Timeout-Context-Two-Tier";

export default function App({ Component, pageProps }) {
  return (
    <TimeoutContextProvider>
      <TimeoutModal />
      <TimeoutControls />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TimeoutContextProvider>
  );
}
