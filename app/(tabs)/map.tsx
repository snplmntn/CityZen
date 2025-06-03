import { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Surface, Text, ActivityIndicator, useTheme } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { useFetchLocation } from "@/hooks";
import MapActionBar from "@/components/MapActionBar";

const MapScreen = () => {
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const mapRef = useRef(null);
  const { colors } = useTheme();

  useFetchLocation({setLocation, setLocationPermission});

  if (locationPermission === false) {
    return (
      <View style={[styles.rootContainer, {justifyContent: "center"}]}>
        <FontAwesome5 name="exclamation-circle" size={32} color={colors.primary} />
        <Text>Location permissions is required to run the app!</Text>
      </View>
    );
  }

  if (location === null) {
    return (
      <View style={[styles.rootContainer, {justifyContent: "center"}]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Surface elevation={0}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={false}
        camera={{
          center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          zoom: 17,
          pitch: 0,
          heading: 0
        }}
      />
      <MapActionBar 
        mapRef={mapRef}
        location={location}
        setShowReportModal={setShowReportModal}
        setShowHelpModal={setShowHelpModal}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    padding: 12
  },
  map: {
    width: "100%",
    height: "100%"
  }
})

export default MapScreen;
