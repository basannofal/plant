import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../../constant/theme";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";

const width = Dimensions.get("window").width / 2 - 30;

export default function HomeScreen({ navigation }) {
  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    StatusBar.setBackgroundColor(COLORS.green);
    fetchPlantData(); // Fetch plant data when the component mounts
  }, []);

  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const Card = ({ plants }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Details", plants)}
      >
        <View style={styles.card}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: plants.plant_image }}
              style={{
                width: 120,
                height: 120,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 20 }}>
              {plants.plant_name}
            </Text>
            <View
              style={{
                height: 25,
                width: 25,
                backgroundColor: COLORS.green,
                borderRadius: 5,
                justifyContent: "center",
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: COLORS.white,
                  fontWeight: "bold",
                }}
              >
                <Entypo name="unread" size={24} color={COLORS.white} />
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredPlants = plants.filter((plant) => {
    const plantName = plant.plant_name.toLowerCase();
    const query = searchQuery.toLowerCase();
    return plantName.includes(query);
  });

  // Function to fetch plant data from the server
  const fetchPlantData = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/fetchplant`
      );
      const plantData = response.data;
      console.log(plantData);
      setPlants(plantData); // Update the state with fetched plant data
    } catch (error) {
      console.error("Error fetching plant data:", error);
    }
  };

  // Function to handle the pull-to-refresh action
  const handleRefresh = () => {
    setIsRefreshing(true); // Set the refreshing state to true
    fetchPlantData(); // Fetch plant data
    setIsRefreshing(false); // Set the refreshing state back to false when done
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}
    >
      <View style={styles.header}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Welcome to</Text>
          <Text
            style={{ fontSize: 38, color: COLORS.green, fontWeight: "bold" }}
          >
            E-Plant
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 30, flexDirection: "row" }}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={25} style={{ marginLeft: 20 }} />
          <TextInput
            placeholder="Search"
            style={styles.input}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
        <View style={styles.sortBtn}>
          <Icon name="sort" size={30} color={COLORS.white} />
        </View>
      </View>
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 20,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={filteredPlants}
        renderItem={({ item }) => {
          return <Card plants={item} />;
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Plants not found</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  categoryText: { fontSize: 16, color: "grey", fontWeight: "bold" },
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
  card: {
    height: 215,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.black,
    textAlign: "center",
    marginTop: 20,
  },
});
