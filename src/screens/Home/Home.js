import React from "react";
import { StyleSheet, View, FlatList, Animated } from "react-native";
import Wrapper from "../../components/Wrapper/Wrapper";
import Text from "../../components/Text/Text";
import { connect } from "react-redux";
import HomeRouteCard from "../../components/RouteCard/HomeRouteCard";
import { nanoid } from "nanoid";
import { completehRoute } from "../../store/actions/driverAction";

class Home extends React.Component {
  render() {
    const { name, routes } = this.props;
    const _keyExtractor = (item, index) => nanoid();
    const renderItem = ({ item, index }) => {
      return (
        <HomeRouteCard
          index={index}
          finish={finish}
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
          distance={item.miles}
          key={index}
        />
      );
    };
    const finish = (key) => {
      routes.slice().filter((item) => item.origin_street !== key);
      this.props.completeRoute(routes);
    };
    return (
      <Wrapper>
        <Text style={styles.title}>Home</Text>
        <View style={styles.welcomeContainer}>
          <Text style={styles.helloTxt}>Hello,</Text>
          <Text style={styles.nameTxt}>{name}</Text>
        </View>
        <View style={styles.routeContainer}>
          <FlatList
            style={styles.cardList}
            keyExtractor={_keyExtractor}
            renderItem={renderItem}
            data={routes}
          />

          {/* <HomeRouteCard
            name={routes[0].first_name + routes[0].last_name}
            address={routes[0].origin_street}
            city={routes[0].origin_city}
            state={routes[0].origin_state}
            zipcode={routes[0].origin_postal}
            key={nanoid()}
          />
          <HomeRouteCard
            name={routes[1].first_name + routes[1].last_name}
            address={routes[1].origin_street}
            city={routes[1].origin_city}
            state={routes[1].origin_state}
            zipcode={routes[1].origin_postal}
            key={nanoid()}
          /> */}
          {/* {routes.length > 3 ? <HomeRouteCard key={nanoid()} /> : null} */}
        </View>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    completeRoute: (routes) => dispatch(completehRoute(routes)),
  };
};

const mapStateToProps = (state) => {
  return {
    theme: state.appConfigReducer.theme,
    name: state.authReducer.name,
    routes: state.driverReducer.routes,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  title: {
    fontFamily: "Viga",
    fontSize: 30,
    alignSelf: "center",
    marginTop: "10%",
  },
  welcomeContainer: {
    marginTop: "10%",
  },
  routeContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  helloTxt: {
    fontFamily: "Viga",
    fontSize: 25,
  },
  nameTxt: {
    fontFamily: "Viga",
    fontSize: 30,
  },
  cardList: {
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },
});
