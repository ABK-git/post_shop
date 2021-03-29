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
  const [signOut] = userSignOut();
  const router = useRouter();
  //context
  const my_context = useContext(MyContext);
  const { displayMenu, changeDisplayMenu, user, setUser } = my_context;

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = () => {
    signOut().then(() => {
      setUser(null);
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
    if (data.user && !user) {
      setUser(data.user);
    }
    else if (!data.user && user) {
      setUser(null);
    }
    //User情報を編集した場合
    if (user && data.user && data.user.avatar != null) {
      if (
        data.user.avatar !== user.avatar ||
        data.user.email !== user.email ||
        data.user.username !== user.username
      ) {
        setUser(data.user);
      }
    }
  }

  return (
    <HeaderContainer>
      <HeaderOptionsLeft>
        <MyLink href="/" design="header-left">
          SHOP
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
                  <MyLink href="/user/cart" design="dropdown-header">
                    カート
                  </MyLink>
                </LiContainer>
                <LiContainer onClick={changeIsOpen}>
                  <MyLink href="/user/order-history" design="dropdown-header">
                    購入履歴
                  </MyLink>
                </LiContainer>
                <LiContainer onClick={changeIsOpen}>
                  <MyLink href="/user/exhibit-history" design="dropdown-header">
                    出品履歴
                  </MyLink>
                </LiContainer>
                <LiContainer onClick={changeIsOpen}>
                  <MyLink href="/user/sold-history" design="dropdown-header">
                    売却履歴
                  </MyLink>
                </LiContainer>
                {user.role === "admin" && (
                  <LiContainer onClick={changeIsOpen}>
                    <MyLink href="/user/admin" design="dropdown-header">
                      管理者ページ
                    </MyLink>
                  </LiContainer>
                )}
              </ul>
            )}
          </SubMenu>
        </MenuContainer>
      )}
    </HeaderContainer>
  );
};

export default withApollo(Header);
