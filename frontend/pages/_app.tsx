import { AppProps } from "next/app"
import "../src/styles/globals.css"

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App