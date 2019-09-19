const initState = {};

const logbookReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_LOGBOOK":
      return state;
    case "CREATE_LOGBOOK_ERROR":
      return state;
    default:
      return state;
  }
};

export default logbookReducer;
