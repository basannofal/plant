import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, StatusBar, Linking } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { COLORS } from "../../constant/theme";
import Button from "../../Button";

export default function Setting({ navigation }) {
  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    StatusBar.setBackgroundColor(COLORS.green);
  }, []);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
  };

  const openLink = () => {
    if (scannedData) {
      Linking.openURL(scannedData);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View>
          <Text style={styles.linkText} onPress={openLink}>
            {scannedData}
          </Text>
          <View>
            <Button
              title={"Tap to Scan Again"}
              onPress={() => setScanned(false)}
              style={styles.button}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    fontSize: 16,
    margin: 20,
    padding: 20,
    backgroundColor: COLORS.white,
    color: COLORS.green,
    textDecorationLine: "underline",
  },
});
