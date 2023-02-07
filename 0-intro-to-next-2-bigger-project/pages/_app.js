import Layout from "../components/layout/layout";
import "../styles/globals.css";

// this file is used to add data (components, logic) to all pages within the application, here we are applying the <Layout> component

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
