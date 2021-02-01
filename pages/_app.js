import "../styles/globals.css";
import "../styles.css";
import "../styles/_app.styles";
import Header from "../components/header/header.component";
import { FullScreen } from "../styles/_app.styles";

function MyApp({ Component, pageProps }) {
  return (
    <FullScreen>
      <Header />
      <Component {...pageProps} />
    </FullScreen>
  );
}

export default MyApp;
