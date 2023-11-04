import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { COLORS } from "./constant/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TwoButton = ({ title, icon, name, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}
    >
      <View style={styles.buttonContent}>
        <Text style={styles.name}>
          {name}
          <MaterialCommunityIcons name={icon} size={24} style={styles.icon} />
        </Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 55,
    width: "100%",
    backgroundColor: COLORS.light,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: COLORS.green,
    fontWeight: "bold",
    fontSize: 16,
  },
  name: {
    color: COLORS.green,
    fontWeight: "bold",
    fontSize: 16,
  },
  icon: {
    color: COLORS.green,
    fontWeight: "bold",
  },
});

export default TwoButton;
