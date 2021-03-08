import ContextTypes from "./types";
import { changeFilterFromEvent, setFilterFromQuery } from "./utils";

const Reducer = (state, action) => {
  switch (action.type) {
    case ContextTypes.DISPLAY_MENU:
      return {
        ...state,
        displayMenu: !state.displayMenu,
      };
    case ContextTypes.CHANGE_FILTER:
      return {
        ...state,
        filterState: changeFilterFromEvent(state.filterState, action.payload),
      };
    case ContextTypes.SET_FILTER_FROM_QUERY:
      return {
        ...state,
        filterState: setFilterFromQuery(state.filterState, action.payload),
      };
    default:
      return state;
  }
};

export default Reducer;
