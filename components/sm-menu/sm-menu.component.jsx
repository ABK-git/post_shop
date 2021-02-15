import React, { useState, useEffect, useContext } from "react";
import MyLink from "../my-link/my-link.component";
import MyContext from "../../context/index";
import { SmMenuContainer, LogoutButton } from "./sm-menu.styles";
import { getLazyAuthUser, userSignOut } from "../../apollo/actions";
import withApollo from "../../hoc/withApollo";
import { useRouter } from "next/router";

const SmMenu = ({apollo}) => {
  //context
  const my_context = useContext(MyContext);
  const { displayMenu } = my_context;
  //graphql
  const [getUser, { data, error }] = getLazyAuthUser();
  const [user, setUser] = useState(null);
  const [signOut] = userSignOut();
  const router = useRouter();

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
    displayMenu &&
    (user ? (
      <SmMenuContainer>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </SmMenuContainer>
    ) : (
      <SmMenuContainer>
        <MyLink href="/login" design="sm-menu">
          Login
        </MyLink>
        <MyLink href="/register" design="sm-menu">
          Register
        </MyLink>
      </SmMenuContainer>
    ))
  );
};

export default withApollo(SmMenu);
