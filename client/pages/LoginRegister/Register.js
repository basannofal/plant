import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import { Ionicons, Feather } from "@expo/vector-icons";
import { COLORS } from "../../components/constant/theme";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import * as ImagePicker from "expo-image-picker";

const Register = ({ navigation }) => {
  StatusBar.setBarStyle("light-content", true);
  StatusBar.setBackgroundColor(COLORS.green);

  const [inputs, setInputs] = useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
  });

  const profileOptions = [
    { label: "Student", value: 0 },
    { label: "Farmer", value: 1 },
    { label: "Other", value: 2 },
  ];

  const [selectedProfile, setSelectedProfile] = useState(0);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError("Please input fullname", "fullname");
      isValid = false;
    }

    if (!inputs.phone) {
      handleError("Please input phone number", "phone");
      isValid = false;
    } else if (inputs.phone.length !== 10) {
      handleError("Phone number must be exactly 10 digits", "phone");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const selectedProfileValue = selectedProfile.value;

        const group = {
          fullname: inputs.fullname,
          email: inputs.email,
          phone: inputs.phone,
          password: inputs.password,
          selectedProfile: selectedProfileValue,
          profilePic: imageUrl,
        };

        console.log(group);
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}/adduser`,
          group
        );
        console.log("Response data:", response.data);
        setLoading(false);
        alert(`${inputs.fullname} You Are Registered.`);
        // Clear input fields
        setInputs({
          fullname: "",
          email: "",
          phone: "",
          password: "",
        });
        navigation.navigate("Login");
      } catch (error) {
        console.log("Error:", error.message);
        console.log("Error details:", error.response);
        setLoading(false);
      }
    }, 1000);
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      console.log("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: image,
      type: "image/jpeg",
      name: "plant_image.jpg",
    });
    formData.append("upload_preset", "plantapp");
    formData.append("cloud_name", "daipaymc1");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/daipaymc1/image/upload",
        formData
      );

      console.log("Cloudinary Response:", response.data);

      if (response.data.secure_url) {
        // Once the image is uploaded, you can save the image URL.
        const imageUrl = response.data.secure_url;
        setImageUrl(imageUrl);
        console.log("Image URL:", imageUrl);

        // Add your code to handle the image URL. Update user data with the new image URL.
        // Assuming you have a `setUserData` function to update user data.
        const updatedUserData = { ...userData, profilePicture: imageUrl };
        setUserData(updatedUserData);

        // Update the profile picture in AsyncStorage to persist it
        await AsyncStorage.setItem("profilePicture", imageUrl);
        0;
      } else {
        console.error("Cloudinary response did not contain a secure URL.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Register
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Register
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "fullname")}
            value={inputs.fullname}
            onFocus={() => handleError(null, "fullname")}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullname}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            value={inputs.email}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "phone")}
            value={inputs.phone}
            onFocus={() => handleError(null, "phone")}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.phone}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Text style={{ fontSize: 14, marginVertical: 5, color: COLORS.grey }}>
            Select Your Profile:
          </Text>
          <View
            style={{
              marginVertical: 5,
              height: 55,
              backgroundColor: COLORS.light,
              paddingHorizontal: 15,
              paddingTop: 10,
            }}
          >
            <Dropdown
              data={profileOptions}
              search
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={selectedProfile}
              onChange={(value) => setSelectedProfile(value)}
            />
          </View>
          <Text style={{ fontSize: 14, marginVertical: 5, color: COLORS.grey }}>
            Select Your Profile Picture:
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Ionicons
                name="ios-camera"
                size={24}
                color={COLORS.green}
                onPress={pickImage}
              />
              <Text>Select Picture</Text>
            </View>
            <Image
              source={{ uri: image }}
              style={{ marginLeft: 40, marginRight: 40, width: 50, height: 50 }}
            />
            <View style={{ alignItems: "center" }}>
              <Feather
                name="upload"
                size={24}
                color={COLORS.green}
                onPress={uploadImage}
              />
              <Text>Upload Picture</Text>
            </View>
          </View>

          <Button title="Register" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("Login")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Already have account ? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
