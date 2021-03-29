import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
import Text from "../../components/Text/Text";
import Ionicons from "react-native-vector-icons/Ionicons";
import Wrapper from "../../components/Wrapper/Wrapper";
import ChatBubble from "../../components/ChatBubble/ChatBubble";
import { colors } from "../../constants/theme";
import { connect } from "react-redux";

const renderInputToolbar = (props) => {
  return <InputToolbar {...props} containerStyle={{ borderRadius: 10 }} />;
};

function Messages(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          // avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  const { recipient_name } = props.route.params;
  return (
    <Wrapper>
      <Ionicons
        style={styles.backIcon}
        onPress={() => props.navigation.goBack()}
        name="md-chevron-back-sharp"
        color={colors.green}
        size={30}
      />
      <View style={styles.header}>
        <Text style={styles.message_to}>{recipient_name}</Text>
      </View>
      <View style={styles.messageContainer}>
        <GiftedChat
          renderBubble={ChatBubble}
          renderInputToolbar={renderInputToolbar}
          messages={props.messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    </Wrapper>
  );
}

const mapStateToProps = (state) => {
  return {
    messages: state.driverReducer.messages,
    id: state.authReducer.id,
  };
};

export default connect(mapStateToProps)(Messages);

const styles = StyleSheet.create({
  header: {
    height: "5%",
    justifyContent: "center",
    flexDirection: "row",
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  messageContainer: {
    height: "95%",
  },
  backIcon: {
    position: "absolute",
    width: 30,
    height: 30,
    left: 10,
    zIndex: 1,
  },
  message_to: {
    fontFamily: "Viga",
    fontSize: 20,
  },
});
