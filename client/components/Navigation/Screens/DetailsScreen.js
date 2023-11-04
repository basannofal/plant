import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../../constant/theme";
import YoutubePlayer from "react-native-youtube-iframe";

const DetailsScreen = ({ navigation, route }) => {
  const plants = route.params;
  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    StatusBar.setBackgroundColor(COLORS.green);
  }, []);

  function extractVideoId(link) {
    // Extract the video ID from a YouTube link
    const videoIdMatch = link.match(
      /(v=|\/embed\/|\/watch\?v=)([a-zA-Z0-9_-]+)/
    );

    if (videoIdMatch && videoIdMatch[2]) {
      return videoIdMatch[2];
    } else {
      // If the link format is not recognized, handle it as needed
      return "";
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={style.imageContainer}>
        <Image
          source={{ uri: plants.plant_image }}
          style={{
            width: 200,
            height: 300,
          }}
        />
      </View>
      <View style={style.detailsContainer}>
        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold" }}></Text>
          <View style={style.plantTag}>
            <Text
              style={{
                marginLeft: 15,
                color: COLORS.white,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {plants.plant_name}
            </Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 20,
            paddingHorizontal: 20,
          }}
        >
          <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Plant Descripion
            </Text>
            <Text
              style={{
                color: "grey",
                fontSize: 16,
                lineHeight: 22,
                marginTop: 10,
              }}
            >
              {plants.plant_desc}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 20 }}>
              How to Grow Plant
            </Text>
            <Text
              style={{
                color: "grey",
                fontSize: 16,
                lineHeight: 22,
                marginTop: 10,
              }}
            >
              {plants.grow_plant}
            </Text>

            <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 20 }}>
              Name of Growth Plant Cities
            </Text>
            <Text
              style={{
                color: "grey",
                fontSize: 16,
                lineHeight: 22,
                marginTop: 10,
              }}
            >
              {plants.grow_plant_city}
            </Text>

            <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 20 }}>
              Plant Desease
            </Text>
            <Text
              style={{
                color: "grey",
                fontSize: 16,
                lineHeight: 22,
                marginTop: 10,
              }}
            >
              {plants.plant_disease}
            </Text>

            <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 20 }}>
              Use of Plant
            </Text>
            <Text
              style={{
                color: "grey",
                fontSize: 16,
                lineHeight: 22,
                marginTop: 10,
              }}
            >
              {plants.plant_medicine}
            </Text>

            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Plant Video
              </Text>
              <View style={{ marginTop: 20 }}>
                <YoutubePlayer
                  height={150}
                  play={true}
                  videoId={extractVideoId(plants.plant_link)} // Pass the extracted video ID
                  onError={(error) =>
                    console.log("YouTube player error: " + error)
                  }
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 0.45,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 0.55,
    backgroundColor: COLORS.light,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 10,
  },
  borderBtn: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 40,
  },
  borderBtnText: { fontWeight: "bold", fontSize: 28 },
  buyBtn: {
    width: 130,
    height: 50,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  plantTag: {
    backgroundColor: COLORS.green,
    width: 200,
    textAlign: "center",
    height: 40,
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});

export default DetailsScreen;
