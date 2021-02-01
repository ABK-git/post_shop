import "../styles/globals.css";
import "../styles.css";
import "../styles/_app.styles";
import Header from "../components/header/header.component";
import { ComponentsContainer, FullScreen } from "../styles/_app.styles";

function MyApp({ Component, pageProps }) {
  return (
    <FullScreen>
      <Header />
      <ComponentsContainer>
        <Component {...pageProps} />
      </ComponentsContainer>
    </FullScreen>
  );
}

export default MyApp;
