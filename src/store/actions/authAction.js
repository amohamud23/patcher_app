// import * as types from "./ActionTypes";
// import auth from "@react-native-firebase/auth";

// export const userSignIn = (email, password) => {
//   return (dispatch) => {
//     auth()
//       .signInWithEmailAndPassword(email, password)
//       .then((res) => {
//         console.log(res.user);
//         dispatch(authSuccess(email));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

// const authSuccess = (email) => {
//   return {
//     type: types.AUTH_SUCCESS,
//     email: email,
//   };
// };
