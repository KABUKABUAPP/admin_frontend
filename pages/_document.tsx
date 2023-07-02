import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDYJFRC6Hn7pHOLdLEJgPvjUHTa-XHs8Kw&libraries=places"></script>
      </body>
    </Html>
  )
}
