import MapActionBar from "@/components/MapActionBar";
import ReportDetailsModal from "@/components/ReportDetailsModal";
import ReportFormModal from "@/components/ReportFormModal";
import { useFetchLocation } from "@/hooks";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Location from "expo-location";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ActivityIndicator, Surface, Text, useTheme } from "react-native-paper";

// Define post type
interface Post {
  id: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  reporter: string;
  incidentType:
    | "fire"
    | "car-crash"
    | "crime"
    | "mechanical-failure"
    | "collapsed-structure";
  description: string;
  timestamp: string;
}

// Incident types
const incidentTypes = [
  { slug: "fire", icon: "fire", text: "Fire" },
  { slug: "car-crash", icon: "car-crash", text: "Car Crash" },
  { slug: "crime", icon: "bomb", text: "Crime" },
  { slug: "mechanical-failure", icon: "cogs", text: "Mechanical Failure" },
  {
    slug: "collapsed-structure",
    icon: "building",
    text: "Collapsed Structure",
  },
];

const MapScreen = () => {
  const { colors } = useTheme();
  const [showReportDetails, setShowReportDetails] = useState<
    Record<number, boolean>
  >({
    1: false,
    2: false,
    3: false,
  });
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      coordinates: {
        latitude: 14.695071430735512,
        longitude: 121.11781440740512,
      },
      reporter: "CitiZen 1",
      incidentType: "fire",
      description:
        "A fire broke out at [address] because [reason]. [More details]",
      timestamp: "1748870977000",
    },
    {
      id: 2,
      coordinates: {
        latitude: 14.695071430733512,
        longitude: 121.12781440770512,
      },
      reporter: "CitiZen 2",
      incidentType: "car-crash",
      description: "A car crash occurred at [address]. [More details]",
      timestamp: "1748870977000",
    },
    {
      id: 3,
      coordinates: {
        latitude: 14.625071430733512,
        longitude: 121.12781440770512,
      },
      reporter: "CitiZen 3",
      incidentType: "crime",
      description: "A crime was reported at [address]. [More details]",
      timestamp: "1748870977000",
    },
  ]);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const mapRef = useRef<MapView>(null);

  useFetchLocation({
    setLocation,
    setLocationPermission, // Pass the state setter directly
  });

  if (locationPermission === false) {
    return (
      <View style={[styles.rootContainer, { justifyContent: "center" }]}>
        <FontAwesome5
          name="exclamation-circle"
          size={32}
          color={colors.primary}
        />
        <Text>Location permissions is required to run the app!</Text>
      </View>
    );
  }

  if (location === null) {
    return (
      <View style={[styles.rootContainer, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Surface elevation={0}>
      {/* Safe MapView rendering */}
      {location && location.coords && location.coords.latitude && (
        <MapView
          ref={mapRef}
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={false}
          scrollEnabled={false}
          camera={{
            center: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            zoom: 17,
            pitch: 0,
            heading: 0,
          }}
        >
          {posts.map((post) => {
            return (
              <Marker
                key={`marker-${post.id}`}
                coordinate={post.coordinates}
                tracksViewChanges={false}
                onPress={(e) => {
                  e.stopPropagation();
                  setShowReportDetails((prev) => {
                    return { ...prev, [post.id]: true };
                  });
                }}
              >
                <FontAwesome5
                  name={
                    incidentTypes.find(
                      (type) => type.slug === post.incidentType
                    )?.icon || "exclamation-circle"
                  }
                  size={32}
                  color={colors.primary}
                  style={{ marginBottom: 32 }}
                />
              </Marker>
            );
          })}
        </MapView>
      )}
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
      {posts.map((post) => {
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
        );
      })}
    </Surface>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    padding: 12,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
