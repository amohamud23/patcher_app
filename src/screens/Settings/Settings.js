import React, { useState } from "react";
import {
  Switch,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
} from "react-native";

import { connect } from "react-redux";
import Text from "../../components/Text/Text";
import Wrapper from "../../components/Wrapper/Wrapper";
import { colors, fontSize, lightTheme, darkTheme } from "../../constants/theme";
import { changeTheme } from "../../store/actions/appConfigActions";
import { userLogout } from "../../store/actions/authAction";

const ThemeModal = ({ visible, onPress, close, theme }) => {
  const onSelect = (theme) => {
    onPress(theme);
    close();
  };
  return (
    <View style={styles.centeredView}>
      <Modal transparent={true} visible={visible} animationType="slide">
        <View style={styles.centeredView}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Theme</Text>
            <TouchableWithoutFeedback onPress={() => onSelect("light")}>
              <View style={[styles.themeBtn, theme.cardBackground]}>
                <Text>Light</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => onSelect("dark")}>
              <View style={[styles.themeBtn, theme.cardBackground]}>
                <Text>Dark</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>
    </View>
  );
};

function Settings(props) {
  const [buttton, setButton] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleSwitch = (theme) => {
    setButton(!buttton);
    buttton ? props.setTheme("dark") : props.setTheme("light");
  };
  const selectTheme = (theme) => {
    console.log(theme);
    props.setTheme(theme);
  };
  const handleLogout = () => {
    const { navigation, onLogout } = props;
    onLogout();
    navigation.navigate("Login");
  };
  const theme = props.theme === "light" ? lightTheme : darkTheme;
  const {
    name,
    email,
    company,
    address,
    state,
    city,
    zipcode,
    avatar,
    age,
    approved,
  } = props.user;
  return (
    <Wrapper>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={[theme.cardBackground, styles.detailsContainer]}>
          <Text style={styles.subTitle}>User Details</Text>
          <View style={styles.row}>
            <View style={styles.avatarSection}>
              <Image style={styles.avatar} source={{ uri: avatar }} />
            </View>
            <View style={styles.nameSection}>
              <Text style={styles.nameTxt}>{name}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.companySection}>
              <Text style={styles.companyTxt}>{company}</Text>
              <Text style={styles.detailTxt}>{email}</Text>
            </View>
          </View>

          <View style={styles.addressSection}>
            <Text style={styles.detailTxt}>{address}</Text>
            <View style={styles.citySection}>
              <Text style={styles.detailTxt}>{city} </Text>
              <Text style={styles.detailTxt}>{state}, </Text>
              <Text style={styles.detailTxt}>{zipcode}</Text>
            </View>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <View style={[styles.button, theme.cardBackground]}>
            <Text>Theme</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleLogout}>
          <View style={[styles.button, theme.cardBackground]}>
            <Text>Logout</Text>
          </View>
        </TouchableWithoutFeedback>

        <ThemeModal
          visible={modalVisible}
          close={() => setModalVisible(false)}
          onPress={(theme) => selectTheme(theme)}
          theme={theme}
        />
      </ScrollView>
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
    user: state.authReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 15,
    margin: 15,
  },
  title: {
    fontSize: fontSize.title,
    fontFamily: "Viga",
  },

  detailsContainer: {
    margin: 15,
    borderRadius: 25,
    padding: 15,
    flexDirection: "column",
  },
  subTitle: {
    fontSize: fontSize.subTitle,
    fontWeight: "600",
    fontFamily: "Viga",
    marginBottom: 30,
  },
  nameSection: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  avatarSection: {
    width: "30%",
  },
  row: {
    flexDirection: "row",
  },
  nameTxt: {
    fontFamily: "Viga",
    fontSize: 20,
  },
  companySection: {
    flexDirection: "column",
    marginVertical: 20,
  },
  companyTxt: {
    fontFamily: "Viga",
    fontSize: 25,
    marginBottom: 10,
  },
  addressSection: {
    flexDirection: "column",
  },
  citySection: {
    flexDirection: "row",
  },
  header: {
    marginTop: 15,
  },
  detailTxt: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    height: 200,
    width: "50%",
    backgroundColor: colors.darkGrey,
    borderWidth: 3,
    borderRadius: 25,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 22,
  },
  modalTitle: {
    fontFamily: "Viga",
    fontSize: 25,
    alignSelf: "center",
  },
  themeBtn: {
    height: 30,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
