import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { COLORS, SIZES, FONTS } from "../../constant/theme";
import Button from "../../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Profile({ navigation }) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "first", title: "Photos" },
    { key: "second", title: "Likes" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLORS.primary,
      }}
      style={{
        backgroundColor: COLORS.white,
        height: 44,
      }}
      renderLabel={({ focused, route }) => (
        <Text style={[{ color: focused ? COLORS.black : COLORS.gray }]}>
          {route.title}
        </Text>
      )}
    />
  );

  const [userData, setUserData] = React.useState({});

  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    StatusBar.setBackgroundColor(COLORS.green);

    // Load user data from AsyncStorage
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userDataJson = await AsyncStorage.getItem("userData");
      if (userDataJson) {
        const userData = JSON.parse(userDataJson);
        setUserData(userData);
      }
    } catch (error) {
      console.error("Error loading user data from AsyncStorage", error);
    }
  };

  const logout = async () => {
    // Clear user data from AsyncStorage
    await AsyncStorage.removeItem("userData");
    setUserData({}); // Clear user data in state
    navigation.navigate("Login");
  };

  const generateAvatar = (fullname) => {
    if (!fullname || fullname.trim().length === 0) {
      return "A"; // Default to "A" if no fullname provided
    }
    const initials = fullname.charAt(0).toUpperCase();
    return initials;
  };
  const initialAvatar = generateAvatar(userData.fullname);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}
      >
        <StatusBar backgroundColor={COLORS.gray} />
        <View style={{ width: "100%" }}>
          <Image
            source={require("../../../assets/plants/user_cover.png")}
            resizeMode="cover"
            style={{
              height: 228,
              width: "100%",
            }}
          />
        </View>

        <View style={{ flex: 1, alignItems: "center" }}>
          <View
            style={{
              height: 155,
              width: 155,
              borderRadius: 999,
              marginTop: -90,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {userData.profilePic !== null && userData.profilePic !== "0" ? (
              <Image
                source={{ uri: userData.profilePic }}
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 999,
                }}
              />
            ) : (
              <>
                <Image
                  source={require("../../../assets/plants/user_profile1.png")}
                  style={{
                    height: 155,
                    width: 155,
                    borderRadius: 999,
                    borderWidth: 2,
                  }}
                />
                <Text
                  style={{
                    position: "absolute",
                    color: COLORS.darkGreen,
                    fontSize: 60,
                  }}
                >
                  {initialAvatar}
                </Text>
              </>
            )}
          </View>

          <Text
            style={{
              fontSize: SIZES.h2,
              fontWeight: "bold",
              color: COLORS.green,
              marginVertical: 8,
            }}
          >
            {userData.fullname}
          </Text>

          <View
            style={{
              backgroundColor: COLORS.veryLightGrey,
              marginTop: 20,
              width: "100%",
              height: "100%",
              padding: 50,
            }}
          >
            <Text
              style={{
                fontSize: SIZES.h4,
                fontWeight: "bold",
                color: COLORS.green,
                marginVertical: 8,
              }}
            >
              Email ID :{" "}
              <Text
                style={{
                  fontSize: SIZES.h4,
                  color: COLORS.black,
                  marginVertical: 8,
                }}
              >
                {userData.email}
              </Text>
            </Text>

            <Text
              style={{
                fontSize: SIZES.h4,
                fontWeight: "bold",
                color: COLORS.green,
                marginVertical: 8,
              }}
            >
              Contact Number :{" "}
              <Text
                style={{
                  fontSize: SIZES.h4,
                  color: COLORS.black,
                  marginVertical: 8,
                }}
              >
                {userData.phone}
              </Text>
            </Text>

            <Text
              style={{
                fontSize: SIZES.h4,
                fontWeight: "bold",
                color: COLORS.green,
                marginVertical: 8,
              }}
            >
              Profile Type :{" "}
              <Text
                style={{
                  fontSize: SIZES.h4,
                  color: COLORS.black,
                  marginVertical: 8,
                }}
              >
                {userData.profileType === 0
                  ? "Student"
                  : userData.profileType === 1
                  ? "Farmer"
                  : userData.profileType === 2
                  ? "People"
                  : "Unknown Profile Type"}
              </Text>
            </Text>
            <Button title="Log Out" onPress={logout} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
