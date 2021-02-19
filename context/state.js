import React, { useReducer } from "react";
import MyContext from "./index";
import ContextTypes from "./types";
import Reducer from "./reducer";
import { useMediaQuery } from "react-responsive";

const MyState = ({ children }) => {
  const initialState = {
    displayMenu: false,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const changeDisplayMenu = () => {
    dispatch({
      type: ContextTypes.DISPLAY_MENU,
    });
  };

  const smBreakPoint = useMediaQuery({ minWidth: 640 });

  const { displayMenu } = state;
  return (
    <MyContext.Provider
      value={{ displayMenu, smBreakPoint, changeDisplayMenu }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyState;
