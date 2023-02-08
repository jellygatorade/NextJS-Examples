import Link from "next/link";

function AboutPage() {
  return (
    <>
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
