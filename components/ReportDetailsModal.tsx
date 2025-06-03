import { useEffect } from "react";
import { ScrollView, Modal, View, StyleSheet } from "react-native";
import { TouchableRipple, Surface, Text, useTheme } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ActivityFeedPostCard from "@/components/ActivityFeedPostCard";

const ReportDetailsModal = ({
  userLocation,
  mapRef,
  visible,
  setVisible,
  id,
  incidentCoordinates,
  reporter,
  incidentType,
  description,
  timestamp
}) => {
  const { colors } = useTheme();

  return (
    <Modal
      animationType="slide"
      visible={visible}
      backdropColor="#00000022"
      onRequestClose={() => setVisible((prev) => {
        return {...prev, [id]: false}
      })}
    >
      <View style={{ position: "absolute", bottom: 0 }}>
        <Surface style={styles.baseContainer}>
          <View style={styles.header}>
            <Text variant="displaySmall" style={{ fontWeight: "bold" }}>Incident Details</Text>
            <TouchableRipple
              rippleColor="rgba(255, 255, 255, .32)"
              style={{ padding: 8, borderRadius: 16 }}
              onPress={() => setVisible((prev) => {
                return {...prev, [id]: false}
              })}
            >
              <FontAwesome5 name="times" size={32} color="white" />
            </TouchableRipple>
          </View>
          <ActivityFeedPostCard 
            userLocation={userLocation}
            incidentCoordinates={incidentCoordinates}
            reporter={reporter}
            incidedntType={incidentType}
            description={description}
            timestamp={timestamp}
          />
        </Surface>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: "#222",
    borderRadius: 32,
    padding: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default ReportDetailsModal;
