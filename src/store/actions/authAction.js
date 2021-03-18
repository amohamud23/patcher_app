import * as types from "./ActionTypes";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const userSignIn = (email, password) => {
  return async (dispatch) => {
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res.user.uid);
        firestore()
          .collection("users")
          .doc(res.user.uid)
          .get()
          .then((doc) => {
            const {
              email,
              name,
              id,
              address,
              city,
              state,
              zipcode,
              phone,
              age,
              company,
              companyID,
              avatar,
              approved,
              employeeType,
            } = doc.data();
            dispatch(
              authSuccess(
                email,
                name,
                id,
                address,
                city,
                state,
                zipcode,
                phone,
                age,
                company,
                companyID,
                avatar,
                approved,
                employeeType,
                "Successfully Signed In"
              )
            );
          })
          .catch((err) => {
            console.log(err);
            dispatch(authFail(err));
          });
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};

export const userLogout = () => {
  return (dispatch) => {
    auth()
      .signOut()
      .then(() => {
        dispatch(authLogout("Successfully Signed Out"));
      });
  };
};

const authSuccess = (
  email,
  name,
  id,
  address,
  city,
  state,
  zipcode,
  phone,
  age,
  company,
  companyID,
  avatar,
  approved,
  employeeType,
  status
) => {
  return {
    type: types.AUTH_SUCCESS,
    payload: {
      email: email,
      status: status,
      name: name,
      id: id,
      address: address,
      city,
      state: state,
      zipcode: zipcode,
      phone: phone,
      age: age,
      company: company,
      companyID: companyID,
      avatar: avatar,
      approved: approved,
      employeeType: employeeType,
    },
  };
};

const authFail = (status) => {
  return {
    type: types.AUTH_FAIL,
    status: status,
  };
};

const authLogout = (status) => {
  return {
    type: types.AUTH_LOGOUT,
    status: status,
  };
};
