import React from "react";
import { Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { darkTheme, lightTheme } from "../../constants/theme";

function FontText(props) {
  const theme = props.theme === "light" ? lightTheme : darkTheme;
  return (
    <Text
      {...props}
      style={[
        props.style,
        props.style === undefined || props.style.color === undefined
          ? { color: theme.color }
          : null,
      ]}
    >
      {props.children}
    </Text>
  );
}

const mapStateToProps = (state) => {
  return {
    theme: state.appConfigReducer.theme,
  };
};

export default connect(mapStateToProps)(FontText);
