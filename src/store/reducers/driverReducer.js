const defaultState = {
  routes: [],
  inbox: [],
};
const driverReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_INBOX":
      state.inbox = action.payload;
      return { ...state };
    case "GET_ROUTES":
      state.routes = action.payload;
      return { ...state };

    default:
      return state;
  }
};

export default driverReducer;
