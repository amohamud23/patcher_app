import { nanoid } from "nanoid";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { colors } from "../../constants/theme";
import Text from "../Text/Text";
import { com } from "../../store/actions/driverAction";

function HomeRouteCard({
  name,
  pickUp_address,
  pickUp_city,
  pickUp_state,
  pickUp_zipcode,
  dropOff_address,
  dropOff_city,
  dropOff_state,
  dropOff_zipcode,
  phoneNum,
  appointment,
  finish,
  index,
  navigation,
}) {
  const height = new Animated.Value(0);
  const width = Dimensions.get("window");

  const heightInterpolate = height.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width],
  });
  const onFinish = () => {
    console.log("Animate");
    Animated.timing(height, {
      toValue: 500,
      duration: 500,
      useNativeDriver: true,
    }).start(() => finish(address));
  };
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("RouteDetail", { selectRoute: index })}
    >
      <View style={[styles.container]}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.time}>{appointment}</Text>
          <Text style={styles.address}>{pickUp_address}</Text>
          <Text style={styles.city}>
            {pickUp_city}, {pickUp_state} {pickUp_zipcode}
          </Text>
        </View>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.address}>{dropOff_address}</Text>
          <Text style={styles.city}>
            {dropOff_city}, {dropOff_state} {dropOff_zipcode}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default HomeRouteCard;

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: colors.yellow,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    padding: 15,
  },
  address: {
    fontFamily: "Viga",
    color: colors.green,
    fontSize: 16,
  },
  name: {
    fontFamily: "Viga",
    color: colors.green,
    fontSize: 16,
  },
  appointmentTime: {
    fontFamily: "Viga",
    fontSize: 20,
  },
  finishBtn: {
    borderColor: colors.green,
    borderWidth: 2,
    padding: 10,
    width: "25%",
    alignItems: "center",
  },
  btnText: {
    fontFamily: "Viga",
    color: "white",
  },
  time: {},
  city: {
    fontFamily: "Viga",
    fontSize: 16,
    color: colors.green,
  },
});
