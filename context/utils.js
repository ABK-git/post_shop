export const changeFilterFromEvent = (oldFilterState, event) => {
  let newFilterState = oldFilterState;
  const { name, value } = event.target;
  newFilterState[name] = value;
  return newFilterState;
};

export const setFilterFromQuery = (oldFilterState, newStateFromQuery) => {
  let newFilterState = oldFilterState;
  const { name, value } = newStateFromQuery;
  newFilterState[name] = value;
  return newFilterState;
};
