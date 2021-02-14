import React, { useState, useEffect } from "react";
import { getLazyAuthUser, userSignOut } from "../../apollo/actions";
import withApollo from "../../hoc/withApollo";
import {
  HeaderContainer,
  HeaderOptionsLeft,
  HeaderOptionsRight,
  OptionsLink,
} from "./header.styles";
import MyLink from "../my-link/my-link.component";
import { useRouter } from "next/router";

const Header = ({ apollo }) => {
  const [getUser, { data, error }] = getLazyAuthUser();
  const [user, setUser] = useState(null);
  const [signOut] = userSignOut();
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  if (data) {
    if (data.user && !user) {
      console.log("login")
      setUser(data.user);
    }
    if (!data.user && user) {
      console.log("logout");
      setUser(null);
    }
  }

  const handleLogout = () => {
    signOut().then(() => {
      apollo.resetStore().then(() => router.push("/"));
    });
  };

  return (
    <HeaderContainer>
      <HeaderOptionsLeft>
        <MyLink href="/" design="header-left">
          POST_SHOP
        </MyLink>
      </HeaderOptionsLeft>
      {user ? (
        <HeaderOptionsRight>
          <OptionsLink onClick={handleLogout}>Logout</OptionsLink>
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
