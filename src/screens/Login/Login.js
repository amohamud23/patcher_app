import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Text from "../../components/Text/Text";
import Wrapper from "../../components/Wrapper/Wrapper";
import { fontSize, colors, darkTheme, lightTheme } from "../../constants/theme";
import Input from "../../components/Input/Input";
import Ionicons from "react-native-vector-icons/Ionicons";
import { userSignIn } from "../../store/actions/authAction";
import { connect } from "react-redux";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = () => {
    props
      .onLogin(email, password)
      .then(() => {
        if (props.status === "Successfully Signed In") {
          props.navigation.navigate("Home");
        }
      })
      .catch(() => console.log("FAIL"));
  };
  return (
    <Wrapper>
      <View style={styles.body}>
        <Text style={styles.title}>Login</Text>
        <Input
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          icon={
            <Ionicons
              containerStyle={{ marginRight: 10 }}
              name="mail"
              size={25}
              color={colors.green}
            />
          }
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          icon={
            <Ionicons
              containerStyle={{ marginRight: 10 }}
              name="key"
              size={25}
              color={colors.green}
            />
          }
        />

        <TouchableWithoutFeedback onPress={handleLogin}>
          <View style={{ backgroundColor: colors.green }}>
            <Text style={{ fontSize: fontSize.subTitle }}>Sign In</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Wrapper>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password) => dispatch(userSignIn(email, password)),
  };
};

const mapStateToProps = (state) => {
  return {
    status: state.authReducer.status,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "50%",
  },
  title: {
    fontSize: fontSize.title,
  },
});
