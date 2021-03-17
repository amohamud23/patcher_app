import * as types from "./ActionTypes";
import auth from "@react-native-firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userSignIn = (email, password) => {
  return async (dispatch) => {
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res.user);
        dispatch(authSuccess(email, "Successfully Signed In"));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail("Login Failed"));
      });
  };
};

const authSuccess = (email, status) => {
  return {
    type: types.AUTH_SUCCESS,
    payload: { email: email, status: status },
  };
};

const authFail = (status) => {
  return {
    type: types.AUTH_FAIL,
    status: status,
  };
};
