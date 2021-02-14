import React, { useState, useEffect } from "react";
import { getLazyAuthUser } from "../../apollo/actions";
import withApollo from "../../hoc/withApollo";
import {
  HeaderContainer,
  HeaderOptionsLeft,
  HeaderOptionsRight,
  OptionsLink,
} from "./header.styles";
import MyLink from "../my-link/my-link.component";

const Header = () => {
  const [getUser, { data, error }] = getLazyAuthUser();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  if (data) {
    if (data.user && !user) {
      setUser(data.user);
    }
    if (!data.user && user) {
      setUser(null);
    }
  }

  return (
    <HeaderContainer>
      <HeaderOptionsLeft>
        <MyLink href="/" design="header-left">
          POST_SHOP
        </MyLink>
      </HeaderOptionsLeft>
      {user ? (
        <HeaderOptionsRight>
          <OptionsLink>ddd</OptionsLink>
        </HeaderOptionsRight>
      ) : (
        <HeaderOptionsRight>
          <MyLink href="/login" design="header-right">
            Login
          </MyLink>
          <MyLink href="/register" design="header-right">
            Register
          </MyLink>
        </HeaderOptionsRight>
      )}
    </HeaderContainer>
  );
};

export default withApollo(Header);
