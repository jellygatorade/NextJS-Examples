import "@/styles/globals.css";

import Transition from "../framer-motion/transition";

import Layout from "../components/layout/layout";

import TimeoutModal from "../two-tiered-timeout-context/components/TimeoutModal";
import TimeoutControls from "../two-tiered-timeout-context/components/TimeoutControls";
import { TimeoutContextProvider } from "../two-tiered-timeout-context/timeout-context/Timeout-Context-Two-Tier";

import Nav from "../components/nav/Nav";

// Advanced features, custom 'app'
// https://nextjs.org/docs/advanced-features/custom-app

/*
 * The `Component` prop is the active `page`, so whenever you navigate between routes, `Component` will change to the new `page`.
 * Therefore, any props you send to `Component` will be received by the `page`
 *
 * `pageProps` is an object with the initial `props` that were preloaded for your page by one of our data fetching methods, otherwise it's an empty object.
 */

// This file is used to add data (components, logic) to ALL pages within the application
// Like wrapping pages in a layout the defines a header or nav
// Or providing a React Context to all pages - https://www.netlify.com/blog/2020/12/01/using-react-context-for-state-management-in-next.js/

export default function App({ Component, pageProps }) {
  return (
    // Nothing passed to all pages
    // <Component {...pageProps} />

    // Layout parents all pages
    // <Layout>
    //   <Component {...pageProps} />
    // </Layout>

    // Layout + Transtion parent all pages
    // <Layout>
    //   <Transition>
    //     <Component {...pageProps} />
    //   </Transition>
    // </Layout>

    // Timeout context available to all pages
    // <TimeoutContextProvider>
    //   <TimeoutModal />
    //   <TimeoutControls />
    //   <Layout>
    //     <Component {...pageProps} />
    //   </Layout>
    // </TimeoutContextProvider>

    // Nav
    <>
      <Nav />
      <Transition>
        <Component {...pageProps} />
      </Transition>
    </>
  );
}
