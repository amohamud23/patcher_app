import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Wrapper from "../../components/Wrapper/Wrapper";
import Text from "../../components/Text/Text";
import { darkTheme, fontSize, lightTheme } from "../../constants/theme";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

function Detail(props) {
  const { selectRoute } = props.route.params;
  const {
    origin_phone,
    origin_city,
    origin_state,
    miles,
    destination_comments,
    home_number,
    destination_postal,
    destination_city,
    destination_name,
    origin_county,
    date_of_service,
    origin_name,
    origin_postal,
    destination_state,
    origin_comments,
    origin_street,
    status,
    type_of_trip,
    request_type,
    escorts,
    first_name,
    appointment_time,
    los,
    trip_id,
    destination_county,
    gender,
    destination_phone,
    origin_suite,
    destination_suite,
    member_unique_identifierm,
    pickup_time,
    last_name,
    destination_street,
  } = props.routes[selectRoute];
  const theme = props.theme === "light" ? lightTheme : darkTheme;
  return (
    <Wrapper>
      <TouchableOpacity
        style={styles.back}
        onPress={() => props.navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={20} color={theme.color} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>Route Details</Text>
      </View>
      <ScrollView>
        <View style={styles.detailContainer}>
          <View style={styles.subTitleHeader}>
            <Text style={styles.subtitile}>Pick Up</Text>
            <Text style={styles.subtitile}>{pickup_time}</Text>
          </View>

          <Text style={styles.appointment}>
            Appointment Time: {appointment_time}
          </Text>
          <Text style={styles.userInfo}>
            Name: {first_name} {last_name}
          </Text>
          <Text style={styles.userInfo}>Gender: {gender}</Text>
          <Text style={styles.userInfo}>Address:</Text>
          <Text style={styles.userInfo}>{origin_street}</Text>
          <View style={styles.cityContainer}>
            <Text style={styles.userInfo}>
              {origin_city}, {origin_state} {origin_postal}
            </Text>
          </View>
          <Text style={styles.userInfo}>Comments: {origin_comments}</Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.subTitleHeader}>
            <Text style={styles.subtitile}>Drop Off</Text>
          </View>
          <Text style={styles.userInfo}>
            Name: {first_name} {last_name}
          </Text>
          <Text style={styles.userInfo}>Gender: {gender}</Text>
          <Text>Address:</Text>
          <Text style={styles.userInfo}>{destination_street}</Text>
          <View style={styles.cityContainer}>
            <Text style={styles.userInfo}>
              {destination_city}, {destination_state} {destination_postal}
            </Text>
          </View>
          <Text style={styles.userInfo}>Comments: {destination_comments}</Text>
        </View>
      </ScrollView>
    </Wrapper>
  );
}

const mapStateToProps = (state) => {
  return {
    routes: state.driverReducer.routes,
    theme: state.appConfigReducer.theme,
  };
};

export default connect(mapStateToProps)(Detail);

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.title,
    marginBottom: 20,
    fontFamily: "Viga",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  subtitile: {
    fontSize: fontSize.subTitle,
    marginBottom: 20,
    fontFamily: "Viga",
    marginRight: "10%",
  },
  detailContainer: {
    padding: 20,
    width: "100%",
  },
  cityContainer: {
    flexDirection: "row",
  },
  comments: {
    fontSize: fontSize.title,
    marginBottom: 20,
    fontFamily: "Viga",
  },
  subTitleHeader: {
    flexDirection: "row",
  },
  back: {
    position: "absolute",
    right: "5%",
    top: 0,
    flexDirection: "row",
  },
  backText: {
    fontSize: 16,
    fontFamily: "Viga",
  },
  appointment: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
  },
  userInfo: {
    fontSize: 16,
    fontFamily: "Viga",
    marginVertical: 5,
  },
});
