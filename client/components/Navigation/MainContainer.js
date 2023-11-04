import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import Register from "../../pages/LoginRegister/Register";
import Login from "../../pages/LoginRegister/Login";
import HomeScreen from "../Navigation/Screens/HomeScreen";
import DetailsScreen from "../Navigation/Screens/DetailsScreen";
import Favorites from "./Screens/Favorites";
import UserScreen from "../Navigation/Screens/UserScreen";
import IntroSlider from "../IntroSlider";
import Profile from "./Screens/Profile";
import Setting from "./Screens/Setting";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constant/theme";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: COLORS.green,
  },
};

const HomeTab = ({ navigation }) => (
  <Tab.Navigator
    screenOptions={screenOptions}
    tabBarOptions={{
      keyboardHidesTabBar: true,
      style: {
        position: "absolute",
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? COLORS.white : COLORS.white}
            />
            <Text style={{ fontSize: 12, color: COLORS.white }}>HOME</Text>
          </View>
        ),
        headerShown: true,
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={Favorites}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"} // Use "favorite-outline" when not focused
              size={24}
              color={focused ? COLORS.white : COLORS.white}
            />
            <Text style={{ fontSize: 12, color: COLORS.white }}>ALERTS</Text>
          </View>
        ),
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={{ marginLeft: 16 }}
          >
            <AntDesign name="arrowleft" size={24} color={COLORS.black} />
          </TouchableOpacity>
        ),
      }}
    />
    <Tab.Screen
      name="Plant"
      component={UserScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.white,
              width: Platform.OS == "ios" ? 50 : 60,
              height: Platform.OS == "ios" ? 50 : 60,
              top: Platform.OS == "ios" ? -10 : -20,
              borderRadius: Platform.OS == "ios" ? 25 : 30,
            }}
          >
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={40}
              color={COLORS.green}
            />
          </View>
        ),
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={{ marginLeft: 16 }}
          >
            <AntDesign name="arrowleft" size={24} color={COLORS.black} />
          </TouchableOpacity>
        ),
      }}
    />
    <Tab.Screen
      name="Scanner"
      component={Setting}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <MaterialIcons
              name="qr-code-scanner"
              size={24}
              color={COLORS.white}
            />
            <Text style={{ fontSize: 12, color: COLORS.white }}>SCANN</Text>
          </View>
        ),
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={{ marginLeft: 16 }}
          >
            <AntDesign name="arrowleft" size={24} color={COLORS.black} />
          </TouchableOpacity>
        ),
      }}
    />
    <Tab.Screen
      name="User Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <FontAwesome5
              name={focused ? "user-alt" : "user"}
              size={24}
              color={focused ? COLORS.white : COLORS.white}
            />
            <Text style={{ fontSize: 12, color: COLORS.white }}>PROFILE</Text>
          </View>
        ),
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={{ marginLeft: 16 }}
          >
            <AntDesign name="arrowleft" size={24} color={COLORS.black} />
          </TouchableOpacity>
        ),
      }}
    />
  </Tab.Navigator>
);

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="IntroSlider">
      <Stack.Screen
        name="IntroSlider"
        component={IntroSlider}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
