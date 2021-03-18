import React, { useState } from "react";
import { StyleSheet, View, Switch, StatusBar } from "react-native";
import Wrapper from "./src/components/Wrapper/Wrapper";
import { changeTheme } from "./src/store/actions/appConfigActions";
import { connect } from "react-redux";
import Text from "./src/components/Text/Text";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login/Login";
import Tabs from "./src/components/TabBar/TabBar";

const Stack = createStackNavigator();

function App(props) {
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
      {props.id !== null ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Tabs}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
            initialParams={{ theme: props.theme }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Tabs}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
            initialParams={{ theme: props.theme }}
          />
        </Stack.Navigator>
      )}
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
    id: state.authReducer.id,
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
