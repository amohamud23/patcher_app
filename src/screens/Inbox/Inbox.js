import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import Text from "../../components/Text/Text";
import Wrapper from "../../components/Wrapper/Wrapper";
import Entypo from "react-native-vector-icons/Entypo";
import { colors, darkTheme, lightTheme, fontSize } from "../../constants/theme";
import InboxItem from "../../components/InboxItem/InboxItem";
import { nanoid } from "nanoid";
import { selectMessage, newMessage } from "../../store/actions/driverAction";
import firestore from "@react-native-firebase/firestore";

const messages = [
  {
    _id: 1,
    text: "Hello developer",
    createdAt: "8:00 AM",
    from: "John Doe",
    employeeType: "Dispatcher",
    user: {
      _id: 2,
      name: "Abdi Mohamud",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 2,
    text: "Hello developer",
    createdAt: "12:00 PM",
    from: "William Lee",
    employeeType: "Dispatcher",
    user: {
      _id: 2,
      name: "Abdi Mohamud",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 3,
    text: "Hello developer",
    createdAt: "4:50 AM",
    from: "Robert Sanchez",
    employeeType: "Dispatcher",
    user: {
      _id: 2,
      name: "Abdi Mohamud",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 4,
    text:
      "Non cillum id mollit nulla magna laborum ut consectetur reprehenderit. Exercitation eiusmod minim aliquip eiusmod ad elit esse. Elit dolore occaecat enim pariatur dolor excepteur do adipisicing proident dolor commodo do anim ad. Ut magna incididunt consequat pariatur incididunt minim.",
    createdAt: "2:20 PM",
    from: "Darrell Revis",
    employeeType: "Dispatcher",
    user: {
      _id: 2,
      name: "Abdi Mohamud",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
];

function Inbox(props) {
  const renderItem = ({ item, index }) => {
    return (
      <InboxItem
        from={item.sender_name}
        avatar={item.recipient_avatar}
        message={item.lastMessage}
        time={item.createdAt}
        employeeType={item.sender_employeeType}
        badge={item.unread}
        onPress={() => onSelectInbox(index)}
      />
    );
  };

  const onNewMessage = (contact) => {
    setModalVisible(false);
    setFilterContacts([]);
    props.createNewMessage(contact, props.user, contact.avatar);
    props.navigation.navigate("Messages", {
      recipient: contact,
    });
  };

  const onSelectInbox = (index) => {
    props.selectMessage(
      index,
      props.selectedInbox,
      props.inboxes[index].sender_id,
      props.user,
      props.inboxes[index].recipient_avatar
    );
    props.navigation.navigate("Messages", {
      recipient: {
        name: props.inboxes[index].recipient_name,
        id: props.inboxes[index].recipient_id,
        avatar: props.inboxes[index].recipient_avatar,
      },
    });
  };

  const { inboxes } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectNewRecipient, setNewRecipient] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [filterContacts, setFilterContacts] = useState([]);
  const theme = props.theme === "light" ? lightTheme : darkTheme;
  const newMessageSearch = (value) => {
    if (value === "") {
      setFilterContacts([]);
      return;
    }
    let searchlist = contacts.filter((contact) => contact.name.includes(value));
    setFilterContacts(searchlist);
  };
  const getContacts = (id) => {
    firestore()
      .collection("users")
      .where("companyID", "==", id)
      .get()
      .then((docs) => {
        var list = [];
        docs.forEach((doc) => {
          if (doc.data().id !== props.id) list.push(doc.data());
        });
        setContacts(list);
      });
  };
  return (
    <Wrapper>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={[theme.cardBackground, styles.modalCard]}>
            <Text>Modal</Text>
            <View style={{ flex: 1, width: "100%" }}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search Recipient"
                onChangeText={(text) => newMessageSearch(text)}
              />
              <FlatList
                data={filterContacts}
                renderItem={({ item }) => (
                  <TouchableWithoutFeedback onPress={() => onNewMessage(item)}>
                    <View style={styles.newContactCard}>
                      <Text>{item.name}</Text>
                      <Text>{item.employeeType}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}
              />
            </View>

            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.modalCancelBtn}>
                <Text style={{ color: "white" }}>Cancel</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.title}>Inbox</Text>
        <Entypo
          name="new-message"
          size={25}
          // onPress={() => props.navigation.navigate("Messages")}
          onPress={() => {
            getContacts(props.companyID);
            setModalVisible(true);
          }}
        />
      </View>

      <View style={styles.inboxContainer}>
        <FlatList
          data={inboxes}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          extraData={props}
        />
      </View>
    </Wrapper>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectMessage: (selectIndex, oldIndex, sender, recipient, avatar) =>
      dispatch(selectMessage(selectIndex, oldIndex, sender, recipient, avatar)),
    createNewMessage: (sender, recipient, avatar) =>
      dispatch(newMessage(sender, recipient, avatar)),
  };
};

const mapStateToProps = (state) => {
  return {
    theme: state.appConfigReducer.theme,
    inboxes: state.driverReducer.inbox,
    selectedInbox: state.driverReducer.selectedInbox,
    user: state.authReducer,
    companyID: state.authReducer.companyID,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.title,
    marginBottom: 20,
    fontFamily: "Viga",
  },
  inboxContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  modalView: {
    position: "absolute",
    height: 400,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalCard: {
    width: "80%",
    height: "50%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalCancelBtn: {
    backgroundColor: colors.green,
    height: 40,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  searchInput: {
    width: "100%",
    padding: 10,
    backgroundColor: colors.grey,
    borderRadius: 10,
    marginVertical: 30,
  },
  newContactCard: {
    height: 60,
    width: "100%",
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    justifyContent: "space-evenly",
  },
});
