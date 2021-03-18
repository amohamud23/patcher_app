import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Bubble, Message } from "react-native-gifted-chat";
import { colors } from "../../constants/theme";

function ChatBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          borderTopRightRadius: 15,
          backgroundColor: colors.yellow,
        },
        left: { borderTopLeftRadius: 15, backgroundColor: colors.green },
      }}
      containerToPreviousStyle={{
        right: { borderTopRightRadius: 15 },
        left: { borderTopLeftRadius: 15 },
      }}
      containerToNextStyle={{
        right: { borderTopRightRadius: 15 },
        left: { borderTopLeftRadius: 15 },
      }}
      containerStyle={{
        right: { borderTopRightRadius: 15 },
        left: { borderTopLeftRadius: 15 },
      }}
      textStyle={{
        right: {
          color: colors.green,
        },
        left: {
          color: colors.yellow,
        },
      }}
    />
  );
}

export default ChatBubble;
