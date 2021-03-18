import * as types from "./ActionTypes";
import firestore from "@react-native-firebase/firestore";

export const getRoutes = (id) => {
  return (dispatch) => {
    firestore()
      .collection("users")
      .doc(id)
      .onSnapshot((snapshot) => {
        dispatch(setRoutes(snapshot.data().routes));
      });
  };
};

export const getInbox = (id) => {
  return (dispatch) => {
    firestore()
      .collection("chatRooms")
      .where("to", "==", id)
      .onSnapshot((snapshot) => {
        var inbox = [];
        snapshot.forEach((doc) => {
          inbox.push(doc);
        });
        dispatch(setInbox(inbox));
      });
  };
};

const setRoutes = (routes) => {
  return {
    type: types.GET_ROUTES,
    payload: routes,
  };
};

const setInbox = (inbox) => {
  return {
    type: types.GET_INBOX,
    payload: inbox,
  };
};
