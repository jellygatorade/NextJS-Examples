import Head from "next/head";
import Link from "next/link";

function AboutPage() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <h1>About</h1>
      <ul>
        <li>
          <Link href="../">Back home</Link>
        </li>
        <li>Something else</li>
      </ul>
    </>
  );
}

export default AboutPage;
