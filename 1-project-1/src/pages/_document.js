import { Html, Head, Main, NextScript } from "next/document";

// Advanced features, custom 'document'
// https://nextjs.org/docs/advanced-features/custom-document

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
