import Head from "next/head";
import Link from "next/link";

function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <h1>Contact</h1>
      <ul>
        <li>
          <Link href="../">Back home</Link>
        </li>
        <li>Something else</li>
      </ul>
    </>
  );
}

export default ContactPage;
