import React, { useState } from "react";
import { StyleSheet, View, Switch, StatusBar } from "react-native";
import Wrapper from "./src/components/Wrapper/Wrapper";
import { changeTheme } from "./src/store/actions/appConfigActions";
import { connect } from "react-redux";
import Text from "./src/components/Text/Text";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./src/screens/Login/Login";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors, darkTheme, lightTheme } from "./src/constants/theme";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs(props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            // eslint-disable-next-line prettier/prettier
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Wallet") {
            iconName = focused ? "wallet" : "wallet-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "Community") {
            iconName = focused ? "earth" : "earth-outline";
          } else if (route.name === "Discover") {
            iconName = focused ? "search" : "search-outline";
          }

          // You can return any component that you like here!
          return (
            <Ionicons
              containerStyle={{ marginRight: 10 }}
              name={iconName}
              size={25}
              color={color}
            />
          );
        },
      })}
      tabBarOptions={{
        style: {
          backgroundColor:
            props.theme === "light"
              ? lightTheme.background
              : darkTheme.background,
        },
        activeTintColor: colors.green,
        inactiveTintColor: "gray",
        showLabel: true,
        tabStyle: {
          padding: 2,
        },
        tabBar: {
          backgroundColor: "red",
          borderWidth: 2,
          height: 32,
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={AuthStack}
        options={{
          headerShown: false,
        }}
        navigationOptions={{
          gestureEnabled: false,
        }}
      />
      <Tab.Screen
        name="Home2"
        component={AuthStack}
        options={{
          headerShown: false,
        }}
        navigationOptions={{
          gestureEnabled: false,
        }}
      />
    </Tab.Navigator>
  );
}
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

function App(props) {
  const [buttton, setButton] = useState(false);
  const toggleSwitch = () => {
    setButton(!buttton);
    buttton ? props.setTheme("dark") : props.setTheme("light");
  };

  return (
    // <Wrapper>
    //   <StatusBar
    //     barStyle={props.theme === "light" ? "dark-content" : "light-content"}
    //   />
    //   <View style={styles.container}>
    //     <Text>Open up App.js to start working on your app!</Text>
    //     <StatusBar style="auto" />
    //     <Switch onValueChange={toggleSwitch} value={buttton} />
    //   </View>
    // </Wrapper>
    <NavigationContainer>
      <StatusBar
        barStyle={props.theme === "light" ? "dark-content" : "light-content"}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTheme: (theme) => dispatch(changeTheme(theme)),
  };
};

const mapStateToProps = (state) => {
  return {
    theme: state.appConfigReducer.theme,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
