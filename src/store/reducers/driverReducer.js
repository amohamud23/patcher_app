const defaultState = {
  routes: [],
  inbox: [],
  dispatchers: [],
  selectedInbox: -1,
  messages: [],
};
const driverReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_INBOX":
      state.inbox = action.payload;
      return { ...state };
    case "GET_ROUTES":
      state.routes = action.payload;
      return { ...state };
    case "COMPLETED_ROUTE":
      state.routes = [...action.payload];
      return { ...state };
    case "GET_DISPATCHERS":
      state.dispatchers = action.payload;
      return { ...state };
    case "GET_MESSAGES":
      state.messages = action.payload;
      state.selectedInbox = action.index;
      return { ...state };
    case "SEND_MESSAGE":
      state.messages = action.payload;
      return { ...state };

    default:
      return state;
  }
};

export default driverReducer;
