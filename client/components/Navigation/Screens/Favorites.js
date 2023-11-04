import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constant/theme";
import axios from "axios";

export default function Profile({ navigation }) {
  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    StatusBar.setBackgroundColor(COLORS.green);
    fetchNotification();
  }, []);

  const [notification, setNotification] = useState([]);

  // Function to fetch notificatioin data from the server
  const fetchNotification = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/fetchnotification`
      );
      const notiData = response.data;
      console.log(notiData);
      setNotification(notiData); // Update the state with fetched plant data
    } catch (error) {
      console.error("Error fetching plant data:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Notification Header */}
      <View style={styles.header}></View>

      {/* Notification List */}
      <ScrollView
        contentContainerStyle={{ paddingTop: 10, paddingHorizontal: 10 }}
      >
        <View style={styles.notificationList}>
          {/* Individual Notification */}
          <View style={styles.notificationItem}>
            <View style={styles.notificationContent}>
              {notification.map((notiItem) => (
                <React.Fragment key={notiItem.id}>
                  <Text style={styles.notificationTitle}>
                    {notiItem.notification_type}
                  </Text>
                  <View style={styles.notificationMessageContainer}>
                    <Ionicons
                      name="notifications-outline"
                      size={20}
                      color="black"
                    />
                    <Text style={styles.notificationMessage}>
                      {notiItem.notification_desc}
                    </Text>
                  </View>
                </React.Fragment>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.green,
    padding: 1,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },
  notificationList: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 12,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 17,
    fontWeight: "bold",
    paddingTop: 5,
    color: COLORS.green,
  },
  notificationMessage: {
    fontSize: 15,
    color: COLORS.black,
    padding: 7,
  },
  notificationAction: {
    padding: 8,
    backgroundColor: COLORS.green,
    borderRadius: 8,
  },
  notificationActionText: {
    color: COLORS.white,
    fontSize: 14,
  },
  notificationMessageContainer: {
    flexDirection: "row",
    paddingTop: 5,
    alignItems: "center",
  },
});
