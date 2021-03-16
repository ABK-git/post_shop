import React, { useState, useEffect, useContext } from "react";
import { getLazyAuthUser, userSignOut } from "../../apollo/actions";
import withApollo from "../../hoc/withApollo";
import {
  HeaderContainer,
  HeaderOptionsLeft,
  HeaderOptionsRight,
  OptionsLink,
  MenuIcon,
  LiContainer,
  MenuContainer,
  SubMenu,
  DisplayUserImageContainer,
} from "./header.styles";
import MyLink from "../my-link/my-link.component";
import { useRouter } from "next/router";
import MyContext from "../../context/index";
import Spinner from "../spinner/spinner.component";

const Header = ({ apollo }) => {
  //graphql
  const [getUser, { data, error, loading }] = getLazyAuthUser();
  const [user, setUser] = useState(null);
  const [signOut] = userSignOut();
  const router = useRouter();
  //context
  const my_context = useContext(MyContext);
  const { displayMenu, changeDisplayMenu } = my_context;

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = () => {
    signOut().then(() => {
      apollo.resetStore().then(() => router.push("/"));
    });
  };
  //Userドロップダウンリスト関連
  const [isOpen, setIsOpen] = useState(false);
  const changeIsOpen = () => {
    setIsOpen(!isOpen);
  };

  if (loading) {
    return <Spinner />;
  }

  if (data) {
    if ((data.user && !user) || data.user.avatar !== user.avatar) {
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
          <MyLink href="/product/exhibit" design="header-right">
            Exhibit
          </MyLink>
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
        src={
          displayMenu
            ? "/images/header/menu-off.png"
            : "/images/header/menu-on.png"
        }
      />
      {user && (
        <MenuContainer>
          <DisplayUserImageContainer
            image_pass={user.avatar}
            onClick={changeIsOpen}
          />
          <SubMenu>
            {isOpen && (
              <ul>
                <LiContainer onClick={changeIsOpen}>
                  <MyLink href="/user/update-info" design="dropdown-header">
                    登録情報編集
                  </MyLink>
                </LiContainer>
                <LiContainer onClick={changeIsOpen}>
                  <MyLink href="/" design="dropdown-header">
                    購入履歴
                  </MyLink>
                </LiContainer>
              </ul>
            )}
          </SubMenu>
        </MenuContainer>
      )}
    </HeaderContainer>
  );
};

export default withApollo(Header);
