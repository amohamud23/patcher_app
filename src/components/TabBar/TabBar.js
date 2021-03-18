import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors, darkTheme, lightTheme } from "../../constants/theme";
import Home from "../../screens/Home/Home";
import Messages from "../../screens/Messages/Messages";
import Inbox from "../../screens/Inbox/Inbox";
import Settings from "../../screens/Settings/Settings";
import Routes from "../../screens/Routes/Routes";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Tabs(props) {
  const theme = props.theme === "light" ? lightTheme : darkTheme;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            // eslint-disable-next-line prettier/prettier
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Messages") {
            iconName = focused ? "chatbubbles-sharp" : "chatbubbles-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "Routes") {
            iconName = focused ? "location" : "location-outline";
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
          backgroundColor: theme.background,
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
        name="Routes"
        component={RouteStack}
        options={{
          headerShown: false,
        }}
        navigationOptions={{
          gestureEnabled: false,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={{
          headerShown: false,
        }}
        navigationOptions={{
          gestureEnabled: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
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
        component={Home}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
const MessageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Inbox"
        component={Inbox}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
const RouteStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Routes"
        component={Routes}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.appConfigReducer.theme,
  };
};

export default connect(mapStateToProps)(Tabs);
