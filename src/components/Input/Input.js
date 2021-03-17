import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { colors, darkTheme, fontSize, lightTheme } from "../../constants/theme";

function Input({ theme, icon, placeholder, onChangeText }) {
  //   const theme = theme === "light" ? lightTheme : darkTheme;
  return (
    <View style={styles.containter}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={styles.textInput}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    theme: state.appConfigReducer.theme,
  };
};

export default connect(mapStateToProps)(Input);

const styles = StyleSheet.create({
  containter: {
    backgroundColor: "white",
    borderColor: colors.grey,
    borderWidth: 1,
    width: "100%",
    flexDirection: "row",
    position: "relative",
    borderRadius: 15,
  },
  icon: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    height: 40,
    fontSize: fontSize.input,
  },
  inputContainer: {
    width: "85%",
  },
});
