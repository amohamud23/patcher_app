import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../Text/Text";
import Wrapper from "../Wrapper/Wrapper";
import {} from "nanoid";
import { nanoid } from "@reduxjs/toolkit";

function InboxItem({ from, time, badge }) {
  return (
    <View key={nanoid()} style={styles.container}>
      <Text>{from}</Text>
    </View>
  );
}

export default InboxItem;

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    borderWidth: 2,
    borderColor: "red",
  },
});
