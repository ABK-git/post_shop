import "../styles/globals.css";
import "../styles.css";
import "../styles/_app.styles";
import Header from "../components/header/header.component";
import { ComponentsContainer, FullScreen } from "../styles/_app.styles";
import MyState from "../context/state";
import SmMenu from "../components/sm-menu/sm-menu.component";

function MyApp({ Component, pageProps }) {
  return (
    <MyState>
      <FullScreen>
        <Header />
        <ComponentsContainer>
          <SmMenu/>
          <Component {...pageProps} />
        </ComponentsContainer>
      </FullScreen>
    </MyState>
  );
}

export default MyApp;
