import React from "react";
import { Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

function FontText(props) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        { color: props.theme === "light" ? "black" : "white" },
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
