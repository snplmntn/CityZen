import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

const AlertBanner = () => {
  return (
    <Card style={styles.alertBanner}>
      <Card.Content style={styles.alertContent}>
        <View style={styles.alertRow}>
          <MaterialCommunityIcons
            name="alert"
            size={24}
            color="#EF4444"
            style={styles.alertIcon}
          />
          <Text style={styles.alertTitle}>1.2km Nearby Incident</Text>
        </View>
        <Text style={styles.alertText}>
          Fire reported at Gen. Luna Avenue. Tap for details.
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  alertBanner: {
    backgroundColor: "#FEF2F2",
    marginHorizontal: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
  },
  alertContent: {
    padding: 8,
  },
  alertRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  alertIcon: {
    marginRight: 8,
  },
  alertTitle: {
    fontWeight: "bold",
    color: "#B91C1C",
  },
  alertText: {
    color: "#B91C1C",
    marginTop: 4,
  },
});

export default AlertBanner;
