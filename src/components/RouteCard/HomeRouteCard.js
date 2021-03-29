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
  distance,
  pickUpTime,
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
    }).start(() => finish(index));
  };
  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: height }] }]}
    >
      <View style={styles.patientContainer}>
        <Text>Pick Up</Text>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.address}>{pickUp_address}</Text>
          <Text style={styles.city}>
            {pickUp_city}, {pickUp_state} {pickUp_zipcode}
          </Text>
        </View>
        <Text>Drop Off</Text>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.address}>{dropOff_address}</Text>
          <Text style={styles.city}>
            {dropOff_city}, {dropOff_state} {dropOff_zipcode}
          </Text>
        </View>
      </View>
      <View style={styles.distanceContainer}>
        <Text style={styles.time}>{appointment}</Text>
        <Text style={styles.distanceTitle}>Miles</Text>
        <Text style={styles.distance}>{distance}</Text>
        {index === 0 ? (
          <TouchableOpacity onPress={onFinish}>
            <View style={styles.finishBtn}>
              <Text style={styles.btnText}>Finish</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </Animated.View>
  );
}

export default HomeRouteCard;

const styles = StyleSheet.create({
  container: {
    height: 250,
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
    flexDirection: "row",
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
    backgroundColor: colors.green,
    color: "white",
    padding: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
  },
  btnText: {
    fontFamily: "Viga",
    color: "white",
  },
  time: {
    fontFamily: "Viga",
    color: colors.green,
    fontSize: 16,
  },
  city: {
    fontFamily: "Viga",
    fontSize: 16,
    color: colors.green,
  },
  distanceContainer: {
    width: "25%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  patientContainer: {
    width: "75%",
  },
  distance: {
    fontSize: 30,
    fontFamily: "Viga",
    color: colors.green,
  },
  distanceTitle: {
    fontFamily: "Viga",
    color: colors.green,
  },
});
