import * as types from "./ActionTypes";

export const changeTheme = (theme) => {
  return (dispatch) => {
    dispatch(setTheme(theme));
  };
};

const setTheme = (theme) => {
  return {
    type: types.CHANGE_THEME,
    payload: theme,
  };
};
