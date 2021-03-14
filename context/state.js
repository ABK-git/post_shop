import React, { useReducer } from "react";
import MyContext from "./index";
import ContextTypes from "./types";
import Reducer from "./reducer";
import { useMediaQuery } from "react-responsive";

const MyState = ({ children }) => {
  const initialState = {
    displayMenu: false,
    filterState: {
      name: "",
      category: "",
      lowestPrice: "",
      highestPrice: "",
      lowestEvaluation: 0,
      lowestReviewsLength: 0
    },
    sortState: "",
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const changeDisplayMenu = () => {
    dispatch({
      type: ContextTypes.DISPLAY_MENU,
    });
  };
  const changeFilter = (filterState) => {
    dispatch({
      type: ContextTypes.CHANGE_FILTER,
      payload: filterState,
    });
  };
  const setFilterFromQuery = (filterState) => {
    dispatch({
      type: ContextTypes.SET_FILTER_FROM_QUERY,
      payload: filterState,
    });
  };
  const setSortState = (sortState) => {
    dispatch({
      type: ContextTypes.SET_SORT_STATE,
      payload: sortState,
    });
  };

  const smBreakPoint = useMediaQuery({ minWidth: 640 });

  const { displayMenu, filterState, sortState } = state;
  return (
    <MyContext.Provider
      value={{
        displayMenu,
        filterState,
        sortState,
        smBreakPoint,
        changeDisplayMenu,
        changeFilter,
        setFilterFromQuery,
        setSortState
      }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyState;
