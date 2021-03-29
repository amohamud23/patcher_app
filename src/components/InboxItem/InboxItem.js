import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Text from "../Text/Text";
import Wrapper from "../Wrapper/Wrapper";
import { nanoid } from "nanoid";
import { colors } from "../../constants/theme";

function InboxItem({
  from,
  time,
  badge,
  avatar,
  employeeType,
  message,
  messages,
  index,
  onPress,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View key={nanoid()} style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/lynx-d15a7.appspot.com/o/userAvatars%2Fvans193%40gmail.com?alt=media&token=9f8e57d6-7a48-4a45-878b-c412c8216e2f",
            }}
            style={styles.avatarImg}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.from}>{from}</Text>
          <Text style={styles.employeeTypeTxt}>{employeeType}</Text>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{message}</Text>
          </View>
        </View>

        <View style={styles.timeContainer}>
          {/* <Text>{time}</Text> */}
          <View style={styles.badge}>
            <View
              style={{
                backgroundColor: colors.red,
                borderRadius: 15,
                minWidth: 35,
              }}
            >
              <Text style={styles.badgeTxt}>{badge}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default InboxItem;

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  detailsContainer: {
    width: "60%",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  avatarContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  avatarImg: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  from: {
    fontSize: 20,
    fontFamily: "Roboto",
    fontWeight: "600",
  },
  time: {},
  messageContainer: {
    height: "40%",
  },
  message: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 14,
  },
  timeContainer: {
    width: "20%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  badge: {
    alignItems: "center",
    justifyContent: "center",
  },
  badgeTxt: {
    color: "white",
    padding: 5,
    minWidth: 25,
    textAlign: "center",
    fontFamily: "Viga",
    fontSize: 18,
  },
  employeeTypeTxt: {
    fontFamily: "Roboto",
    fontWeight: "700",
  },
});
