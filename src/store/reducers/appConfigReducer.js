const defaultState = {
  theme: "light",
};
const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      state.theme = action.payload;

      return { ...state };

    default:
      return state;
  }
};

export default authReducer;
