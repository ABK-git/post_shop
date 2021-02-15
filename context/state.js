import React, { useReducer } from "react";
import MyContext from "./index";
import ContextTypes from "./types";
import Reducer from "./reducer";

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

  return (
    <MyContext.Provider
      value={{ displayMenu: state.displayMenu, changeDisplayMenu }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyState;
