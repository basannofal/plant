import React, { useState, useEffect } from "react";
import { View, Text, Image, StatusBar } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { COLORS, SIZES } from "../components/constant/theme";
import Register from "../pages/LoginRegister/Register";
import { useNavigation } from "@react-navigation/native";

const IntroSlider = () => {
  const navigation = useNavigation();
  const [showHomePage, setShowHomePage] = useState(false);

  StatusBar.setBarStyle("light-content", true);
  StatusBar.setBackgroundColor(COLORS.green);

  useEffect(() => {
    if (!showHomePage) {
      StatusBar.setHidden(false);
    }
  }, [showHomePage]);

  const buttonLabel = (label) => {
    return (
      <View style={{ padding: 12 }}>
        <Text
          style={{ color: COLORS.title, fontWeight: "600", fontSize: SIZES.h4 }}
        >
          {label}
        </Text>
      </View>
    );
  };

  const slides = [
    {
      id: 1,
      title: "The Beauty of Greenery",
      description:
        "“Embrace the beauty of greenery, one leaf at a time. Discover diverse plant species and their unique charm. Let nature's serenity enrich your life.\"",
      image: require("../assets/mainscreen/plantScreen1.png"),
    },
    {
      id: 2,
      title: "Nurturing the Earth",
      description:
        "“Plants aren't just decor; they're a testament to nurturing life. Learn to care for them and our planet. Each plant is a step towards a greener world.\"",
      image: require("../assets/mainscreen/plantScreen2.png"),
    },
    {
      id: 3,
      title: "Blossoming Tranquility",
      description:
        '“Find tranquility in the quiet growth of a plant. Embrace the therapeutic experience. Watch them thrive and discover harmony in your life."',
      image: require("../assets/mainscreen/plantScreen3.png"),
    },
  ];

  const handleDone = () => {
    navigation.navigate("Register");
  };

  if (!showHomePage) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              padding: 15,
              paddingTop: 100,
            }}
          >
            <Image
              source={item.image}
              style={{ width: SIZES.width - 80, height: 400 }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontWeight: "bold",
                color: COLORS.title,
                fontSize: SIZES.h1,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                textAlign: "center",
                paddingTop: 5,
                color: COLORS.title,
              }}
            >
              {item.description}
            </Text>
          </View>
        )}
        activeDotStyle={{ backgroundColor: COLORS.green, width: 30 }}
        showSkipButton
        renderNextButton={() => buttonLabel("Next")}
        renderSkipButton={() => buttonLabel("Skip")}
        renderDoneButton={() => buttonLabel("Get Started")}
        onDone={handleDone}
      />
    );
  }

  return <Register />;
};

export default IntroSlider;
