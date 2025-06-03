import { View, StyleSheet } from "react-native";
import { Surface, Text, TouchableRipple, useTheme } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Location from "expo-location";

type Props = {
  mapRef: any,
  location: Location.LocationObject | null,
  setShowReportModal: React.Dispatch<React.SetStateAction<boolean>>,
  setShowHelpModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const MapActionBar = ({
  mapRef,
  location,
  setShowReportModal,
  setShowHelpModal,
}: Props) => {
  const { colors } = useTheme();

  const handleShowReportModal = () => setShowReportModal(true);
  const handleShowHelpModal = () => setShowHelpModal(true);
  const handleMapRecenter = () => {
    if (mapRef?.current) {
      console.log("Work")
      mapRef.current.animateCamera(
        {
          center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          zoom: 18,
        },
        { duration: 1000 }
      );
    }
  };
  const actionButtons = [
    {icon: "question", color: "white", function: handleShowHelpModal},
    {icon: "crosshairs", color: "white", function: handleMapRecenter},
    {icon: "exclamation-circle", color: colors.primary, function: handleShowReportModal}
  ];

  return (
    <Surface style={styles.rootContainer}>
      {actionButtons.map((button, index) => {
        return (
          <TouchableRipple
            key={`map-action-${index}`}
            onPress={button.function}
            rippleColor="#FFFA"
            style={styles.actionButton}
          >
            <FontAwesome5 name={button.icon} size={24} color={button.color}/>
          </TouchableRipple>
        );
      })}
    </Surface>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    position: "absolute",
    backgroundColor: "#222",
    bottom: 0,
    right: 0,
    margin: 8,
    borderRadius: 24
  },
  actionButton: {
    padding: 18,
    borderRadius: 12
  }
})

export default MapActionBar;
