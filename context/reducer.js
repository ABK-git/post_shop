import React, { useReducer } from "react";
import MyContext from "./index";
import ContextTypes from "./types";

const Reducer = (state, action) => {
  switch (action.type) {
    case ContextTypes.DISPLAY_MENU:
      return {
        ...state,
        displayMenu: !state.displayMenu,
      };
    default:
      return state;
  }
};

export default Reducer;
