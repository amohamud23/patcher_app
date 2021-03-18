import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Text from "../../components/Text/Text";
import Wrapper from "../../components/Wrapper/Wrapper";
import { colors, darkTheme, lightTheme, fontSize } from "../../constants/theme";
import InboxItem from "../../components/InboxItem/InboxItem";
import { nanoid } from "nanoid";

const messages = [
  {
    _id: 1,
    text: "Hello developer",
    createdAt: new Date(),
    from: "Dispatcher",
    user: {
      _id: 2,
      name: "Abdi Mohamud",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
];

const renderItem = ({ item }) => {
  return <InboxItem from={item.from} />;
};

function Inbox() {
  return (
    <Wrapper>
      <Text style={styles.title}>Inbox</Text>
      <View style={styles.inboxContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      </View>
    </Wrapper>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectMessage: (id) => dispatch(),
  };
};

const mapStateToProps = (state) => {
  return {
    theme: state.appConfigReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.title,
    marginBottom: 20,
  },
  inboxContainer: {
    flex: 1,
  },
});
