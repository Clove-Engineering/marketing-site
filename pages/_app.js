/*
* This file ensures the globals.css file is loaded.
* */
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp