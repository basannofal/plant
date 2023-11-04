import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Alert,
  StatusBar,
} from "react-native";

import { COLORS } from "../../components/constant/theme";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Login = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  StatusBar.setBarStyle("light-content", true);
  StatusBar.setBackgroundColor(COLORS.green);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const login = async () => {
    const group = {
      email: inputs.email,
      password: inputs.password,
    };

    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/userlogin`,
        group
      );
      console.log(response.data);

      if (Array.isArray(response.data) && response.data.length > 0) {
        const userData = {
          fullname: response.data[0].fullname,
          email: response.data[0].email,
          phone: response.data[0].phone,
          profileType: response.data[0].profile_type,
          profilePic: response.data[0].profile_pic,
        };

        // Store user data in AsyncStorage
        await AsyncStorage.setItem("userData", JSON.stringify(userData));

        // Add this line to log the stored user data
        console.log("Stored userData in AsyncStorage: ", userData);

        alert("You Are Logged In Successfully!");
        navigation.navigate("HomeTab");
      } else {
        alert("Invalid API response format");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Log In
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Button onPress={validate} title="Log In" />
          <Text
            onPress={() => navigation.navigate("Register")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Don't have account ? Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
