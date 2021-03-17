import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { colors, darkTheme, lightTheme } from "../../constants/theme";

function Wrapper(props) {
  const theme = props.theme === "light" ? lightTheme : darkTheme;
  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: theme.background }]}
    >
      <View style={styles.body}>{props.children}</View>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  return {
    theme: state.appConfigReducer.theme,
  };
};

export default connect(mapStateToProps)(Wrapper);

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: "5%",
    flex: 1,
  },
  body: {
    flex: 1,
  },
});
