import React, { useState } from "react";
import {
  Switch,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";

import { connect } from "react-redux";
import Text from "../../components/Text/Text";
import Wrapper from "../../components/Wrapper/Wrapper";
import { colors } from "../../constants/theme";
import { changeTheme } from "../../store/actions/appConfigActions";
import { userLogout } from "../../store/actions/authAction";

function Settings(props) {
  const [buttton, setButton] = useState(false);
  const toggleSwitch = () => {
    setButton(!buttton);
    buttton ? props.setTheme("dark") : props.setTheme("light");
  };
  const handleLogout = () => {
    const { navigation, onLogout } = props;
    onLogout();
    navigation.navigate("Login");
  };
  return (
    <Wrapper>
      <Text>Settings</Text>
      <Switch onValueChange={toggleSwitch} value={buttton} />
      <TouchableWithoutFeedback onPress={handleLogout}>
        <View style={styles.logoutBtn}>
          <Text>Logout</Text>
        </View>
      </TouchableWithoutFeedback>
    </Wrapper>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTheme: (theme) => dispatch(changeTheme(theme)),
    onLogout: () => dispatch(userLogout()),
  };
};

const mapStateToProps = (state) => {
  return {
    theme: state.appConfigReducer.theme,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const styles = StyleSheet.create({
  logoutBtn: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.grey,
  },
});
