import React, { useState, useEffect, useContext } from "react";
import { getLazyAuthUser, userSignOut } from "../../apollo/actions";
import withApollo from "../../hoc/withApollo";
import {
  HeaderContainer,
  HeaderOptionsLeft,
  HeaderOptionsRight,
  OptionsLink,
  MenuIcon,
} from "./header.styles";
import MyLink from "../my-link/my-link.component";
import { useRouter } from "next/router";
import MyContext from "../../context/index";

const Header = ({ apollo }) => {
  //graphql
  const [getUser, { data, error }] = getLazyAuthUser();
  const [user, setUser] = useState(null);
  const [signOut] = userSignOut();
  const router = useRouter();
  //context
  const my_context = useContext(MyContext);
  const { displayMenu, changeDisplayMenu } = my_context;
  
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
      <MenuIcon
        onClick={changeDisplayMenu}
        src={displayMenu ? "/images/menu-off.png" : "/images/menu-on.png"}
      />
    </HeaderContainer>
  );
};

export default withApollo(Header);
