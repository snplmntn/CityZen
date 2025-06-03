import { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Surface, Text, ActivityIndicator, useTheme } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useFetchLocation } from "@/hooks";
import MapActionBar from "@/components/MapActionBar";
import ReportDetailsModal from "@/components/ReportDetailsModal";
import ReportFormModal from "@/components/ReportFormModal";

const MapScreen = () => {
  const { colors } = useTheme();
  const [showReportDetails, setShowReportDetails] = useState<Record<number, boolean>>({
    1: false, 2: false, 3: false
  });
  const [posts, setPosts] = useState([]);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const mapRef = useRef<MapView>(null);

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

  // TODO: Create a hook that fetches nearby reports

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
      >
        {// Render reports within 15km(?)
          // Render markers
          posts?.map((post) => {
            return (
              <Marker 
                key={`marker-${post.id}`}
                coordinate={post.coordinates}
                tracksViewChanger={false}
                onPress={(e) => {
                  e.stopPropagation();
                  setShowReportDetails((prev) => {
                    return {...prev, [post.id]: true}
                  })
                }}
              >
                <FontAwesome5 
                  name={post.incidentType}
                  size={32}
                  color={colors.primary}
                  style={{ marginBottom: 32 }}
                />
              </Marker>
            );
          })
        }
      </MapView>
      <MapActionBar 
        mapRef={mapRef}
        location={location}
        setShowReportModal={setShowReportModal}
        setShowHelpModal={setShowHelpModal}
      />
      <ReportFormModal
        posts={posts}
        setPosts={setPosts}
        location={location}
        visible={showReportModal}
        setVisible={setShowReportModal}
      />
        {
          // Render modals for the reports
          posts?.map((post) => {
            return (
              <ReportDetailsModal 
                key={`report-${post.id}`}
                userLocation={location}
                mapRef={mapRef}
                visible={showReportDetails[post.id]}
                setVisible={setShowReportDetails}
                id={post.id}
                incidentCoordinates={post.coordinates}
                reporter={post.reporter}
                incidentType={post.incidentType}
                description={post.description}
                timestamp={post.timestamp}
              />
            )
          })
        }
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
