import React, { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Text from "../../components/Text/Text";
import Wrapper from "../../components/Wrapper/Wrapper";

function Messages() {
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
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <Wrapper>
      <GiftedChat
        renderBubble={}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </Wrapper>
  );
}

export default Messages;
