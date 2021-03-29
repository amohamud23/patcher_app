import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Wrapper from "../../components/Wrapper/Wrapper";
import Text from "../../components/Text/Text";
import { fontSize } from "../../constants/theme";
import RouteCard from "../../components/RouteCard/RouteCard";
import { connect } from "react-redux";
import { nanoid } from "nanoid";

function Routes(props) {
  const routes = props.routes;
  const renderItem = ({ item, index }) => {
    return (
      <RouteCard
        index={index}
        name={item.first_name + item.last_name}
        pickUp_address={item.origin_street}
        pickUp_city={item.origin_city}
        pickUp_state={item.origin_state}
        pickUp_zipcode={item.origin_postal}
        dropOff_address={item.destination_street}
        dropOff_city={item.destination_city}
        dropOff_state={item.destination_state}
        dropOff_zipcode={item.destination_postal}
        appointment={item.appointment_time}
        key={nanoid()}
        key={index}
        navigation={props.navigation}
      />
    );
  };
  return (
    <Wrapper>
      <View style={styles.header}>
        <Text style={styles.title}>Routes</Text>
      </View>

      <FlatList
        data={routes}
        style={styles.listContainer}
        renderItem={renderItem}
      />
    </Wrapper>
  );
}

const mapStateToProps = (state) => {
  return {
    theme: state.appConfigReducer.theme,
    name: state.authReducer.name,
    routes: state.driverReducer.routes,
  };
};

export default connect(mapStateToProps)(Routes);

const styles = StyleSheet.create({
  header: {
    marginTop: 15,
  },
  title: {
    fontSize: fontSize.title,
    fontFamily: "Viga",
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
  },
});
