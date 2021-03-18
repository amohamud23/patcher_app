import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../Text/Text";

function Route({ name, address }) {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
    </View>
  );
}

export default Route;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
  },
});
