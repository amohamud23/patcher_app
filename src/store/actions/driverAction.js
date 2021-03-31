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
      .collection("inbox")
      .where("recipient_id", "==", id)
      .onSnapshot((snapshot) => {
        var inbox = [];
        snapshot.forEach((doc) => {
          inbox.push(doc.data());
        });
        dispatch(setInbox(inbox));
      });
  };
};

export const getDispatchers = (companyID) => {
  return (dispatch) => {
    firestore()
      .collection("users")
      .where("companyID", "==", companyID)
      .where("employeeType", "==", "admin")
      .get()
      .then((documents) => {
        var dispatchers = [];
        documents.forEach((doc) => {
          dispatchers.push(doc.data());
        });
        dispatch(setDispatchers(dispatchers));
      });
  };
};

export const completehRoute = (routes) => {
  return (dispatch) => {
    routes.shift();
    dispatch(finishRoute(routes));
  };
};

export const selectMessage = (
  selectIndex,
  oldIndex,
  sender,
  recipient,
  avatar
) => {
  console.log(recipient);
  return (dispatch) => {
    var groupId = "";
    if (recipient.id.localeCompare(sender.id) === 1) {
      groupId = recipient.id + sender;
    } else {
      groupId = sender + recipient.id;
    }
    console.log(groupId);
    if (selectIndex !== oldIndex) {
      firestore()
        .collection("messages")
        .where("groupId", "==", groupId)
        // .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          var messages = [];
          snapshot.forEach((msg) => {
            messages.push({
              _id: msg.id,
              text: msg.data().text,
              createdAt: msg.data().createdAt,
              user: {
                _id: sender.id,
                name: sender.name,
                // avatar: "https://placeimg.com/140/140/any",
              },
            });
          });
          dispatch(setMessages(messages, selectIndex));
        });
    }
    // TODO: update inbox unread counter
  };
};

export const newMessage = (recipient, sender, avatar) => {
  return (dispatch) => {
    var groupId = "";
    if (recipient.id.localeCompare(sender.id) === 1) {
      groupId = recipient.id + sender.id;
    } else {
      groupId = sender.id + recipient.id;
    }

    firestore()
      .collection("messages")
      .where("groupId", "==", groupId)
      // .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        var messages = [];
        snapshot.forEach((msg) => {
          messages.push({
            _id: 1,
            text: msg.data().text,
            createdAt: msg.data().createdAt,
            user: {
              _id: sender.id,
              name: sender.name,
              avatar: avatar,
              // avatar: "https://placeimg.com/140/140/any",
            },
          });
        });
        dispatch(setMessages(messages, -1));
      });
  };
};

export const sendMessage = (recipient, sender, message) => {
  return (dispatch) => {
    var groupId = "";
    if (recipient.id.localeCompare(sender.id) === 1) {
      groupId = recipient.id + sender.id;
    } else {
      groupId = sender.id + recipient.id;
    }
    firestore()
      .collection("inbox")
      .where("recipient_id", "==", recipient.id)
      .where("sender_id", "==", sender.id)
      .get()
      .then((doc) => {
        if (doc.docs.length == 0) {
          firestore()
            .collection("inbox")
            .doc(recipient.id + sender.id)
            .set({
              sender_id: sender.id,
              sender_avatar: sender.avatar,
              sender_name: sender.name,
              lastMessage: message,
              sender_employeeType: sender.employeeType,
              unread: 1,
              sentAt: firestore.Timestamp.now(),
              recipient_id: recipient.id,
              recipient_name: recipient.name,
            });
        } else {
          firestore()
            .collection("inbox")
            .doc(recipient.id + sender.id)
            .update({
              lastMessage: message,
              unread: doc.docs[0].data().unread + 1,
              sentAt: firestore.Timestamp.now(),
            });
        }
      })
      .finally(() => {
        firestore()
          .collection("messages")
          .add({
            groupId: groupId,
            sender_id: sender.id,
            recipient_id: recipient.id,
            text: message,
            user: {
              _id: sender.id,
              name: sender.name,
              avatar: sender.avatar,
            },
            createdAt: firestore.Timestamp.now(),
          })
          .then(() => {});
      });
  };
};

const setRoutes = (routes) => {
  return {
    type: types.GET_ROUTES,
    payload: routes,
  };
};

const finishRoute = (routes) => {
  return {
    type: types.COMPLETED_ROUTE,
    payload: routes,
  };
};

const setInbox = (inbox) => {
  return {
    type: types.GET_INBOX,
    payload: inbox,
  };
};

const setDispatchers = (dispatchers) => {
  return {
    type: types.GET_DISPATCHERS,
    payload: dispatchers,
  };
};

const setMessages = (messages, ind) => {
  return {
    type: types.GET_MESSAGES,
    payload: messages,
    index: ind,
  };
};
