import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  SafeAreaView,
  Text,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Input from "../../Input";
import Loader from "../../Loader";
import Button from "../../Button";
import { COLORS } from "../../constant/theme";
import TwoButton from "../../TwoButton";

export default function UserScreen() {
  const [image, setImage] = useState(null);
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
      type: "image/jpeg", // You can adjust the type based on the image type
      name: "plant_image.jpg", // You can provide a different name
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
        // Update the state or perform any necessary actions with the URL.
        const imageUrl = response.data.secure_url;
        console.log("Image URL:", imageUrl);

        // Add your code to handle the image URL, e.g., save it to your state.
        setInputs({
          ...inputs,
          plantImage: imageUrl,
        });
      } else {
        console.error("Cloudinary response did not contain a secure URL.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const [inputs, setInputs] = useState({
    plantName: "",
    plantDesc: "",
    plantImage: "",
    plantLink: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let isValid = true;

    if (!inputs.plantName) {
      handleError("Please input plantname", "plantName");
      isValid = false;
    }

    if (!inputs.plantDesc) {
      handleError("Please input plantdescription", "plantDesc");
      isValid = false;
    }

    if (!inputs.plantLink) {
      handleError("Please input plant video link", "plantLink");
      isValid = false;
    }

    if (isValid) {
      addplant();
    }
  };

  const addplant = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const group = {
          plantName: inputs.plantName,
          plantDesc: inputs.plantDesc,
          plantImage: inputs.plantImage,
          plantLink: inputs.plantLink,
        };

        console.log(group);
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}/addplant`,
          group
        );
        console.log("Response data:", response.data);
        setLoading(false);
        alert(`${inputs.plantName} Plant Successfully Add.`);
        // Clear input fields
        setInputs({
          plantName: "",
          plantDesc: "",
          plantImage: "",
          plantLink: "",
        });
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

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
        <Loader visible={loading} />
        <ScrollView
          contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 20 }}
        >
          <Text
            style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}
          >
            Add Plant
          </Text>
          <View style={{ marginVertical: 20 }}>
            <Input
              onChangeText={(text) => handleOnchange(text, "plantName")}
              value={inputs.plantName}
              onFocus={() => handleError(null, "plantName")}
              iconName="pencil-box-multiple-outline"
              label="Plant Name"
              placeholder="Enter the plant name"
              error={errors.plantName}
            />

            <Input
              onChangeText={(text) => handleOnchange(text, "plantDesc")}
              value={inputs.plantDesc}
              onFocus={() => handleError(null, "plantDesc")}
              iconName="notebook-edit-outline"
              label="Plant Descripion"
              placeholder="Enter the plant description"
              error={errors.plantDesc}
            />
            <Text style={{ fontSize: 14, color: COLORS.grey }}>
              Select the Plant Image
            </Text>
            <TwoButton title="Choose the Plant" onPress={pickImage} />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 100,
                    height: 100,
                  }}
                />
              )}
            </View>

            <TwoButton icon="upload" name="Upload" onPress={uploadImage} />
            <Input
              onChangeText={(text) => handleOnchange(text, "plantImage")}
              iconName="shield-link-variant-outline"
              label="Plant Image URL"
              placeholder="Loading..."
              value={inputs.plantImage}
              editable={false}
            />
            <Input
              onChangeText={(text) => handleOnchange(text, "plantLink")}
              value={inputs.plantLink}
              onFocus={() => handleError(null, "plantLink")}
              iconName="video-high-definition"
              label="Plant Video Link"
              placeholder="Enter the plant video link"
              error={errors.plantLink}
            />
            <View style={{ marginBottom: 50 }}>
              <Button title="Add Plant" onPress={validate} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />
        )}
        <Button title="Upload" onPress={uploadImage} />
      </View> */}
    </>
  );
}
