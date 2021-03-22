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
      lowestReviewsLength: 0,
    },
    sortState: "出品日降順",
    user: null,
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
  const setUser = (user) => {
    dispatch({
      type: ContextTypes.SET_USER,
      payload: user,
    });
  };

  const smBreakPoint = useMediaQuery({ minWidth: 640 });
  const hmBreakPoint = useMediaQuery({ minWidth: 320 });

  const { displayMenu, filterState, sortState, user } = state;
  return (
    <MyContext.Provider
      value={{
        displayMenu,
        filterState,
        sortState,
        smBreakPoint,
        hmBreakPoint,
        changeDisplayMenu,
        changeFilter,
        setFilterFromQuery,
        setSortState,
        user,
        setUser,
      }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyState;
