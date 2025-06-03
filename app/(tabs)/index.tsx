import ActivityFeedPostCard from "@/components/ActivityFeedPostCard";
import { useFetchLocation } from "@/hooks";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import MapView from "react-native-maps";
import { ActivityIndicator, Surface, Text, useTheme } from "react-native-paper";

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Sample posts with valid incident types
const posts = [
  {
    coordinates: {
      latitude: 14.695071430735512,
      longitude: 121.11781440740512,
    },
    reporter: "CitiZen 1",
    incidentType: "fire" as const, // Add type assertion
    description:
      "A fire broke out at [address] because [reason]. [More details]",
    timestamp: 1748870977000,
  },
  {
    coordinates: {
      latitude: 14.695071430733512,
      longitude: 121.12781440770512,
    },
    reporter: "CitiZen 2",
    incidentType: "car-crash" as const, // Changed to a valid type
    description: "A car crash occurred at [address]. [More details]",
    timestamp: 1748870977000,
  },
  {
    coordinates: {
      latitude: 14.625071430733512,
      longitude: 121.12781440770512,
    },
    reporter: "CitiZen 3",
    incidentType: "crime" as const, // Changed to a valid type
    description: "A crime was reported at [address]. [More details]",
    timestamp: 1748870977000,
  },
];

const HomeScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const { colors } = useTheme();

  useFetchLocation({
    setLocation,
    setLocationPermission,
  });

  // Error handling for location errors
  useEffect(() => {
    if (location !== null) {
      try {
        // Test if location data is valid
        const { latitude, longitude } = location.coords;
        if (!latitude || !longitude) {
          throw new Error("Invalid location data");
        }
      } catch (error) {
        console.error("Invalid location data:", error);
        // Set fallback data
        setLocation({
          coords: {
            latitude: 14.676, // Manila coordinates
            longitude: 121.0437,
            altitude: 0,
            accuracy: 0,
            altitudeAccuracy: 0,
            heading: 0,
            speed: 0,
          },
          timestamp: Date.now(),
        });
      }
    }
  }, [location]);

  // Handle permission denied state
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

  // Loading state
  if (location === null) {
    return (
      <View style={[styles.rootContainer, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Surface style={styles.rootContainer} elevation={0}>
      <StatusBar backgroundColor="#1d1c21" barStyle="light-content" />

      {/* Full-width map view */}
      <MapView
        style={styles.fullWidthMap}
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
      />

      {/* Map overlay with warning - improved styling for perfect centering */}
      <View style={styles.mapOverlay}>
        <View style={styles.overlayContent}>
          <FontAwesome5
            name="exclamation-triangle"
            size={14}
            color={colors.primary}
            style={styles.overlayIcon}
          />
          <Text style={styles.overlayText} numberOfLines={1}>
            1.2km Nearby Incident
          </Text>
        </View>
      </View>

      {/* Activity Feed Card - refined styling */}
      <Surface style={styles.card} elevation={2}>
        <View style={styles.feedHeader}>
          <Text variant="headlineSmall" style={styles.feedTitle}>
            Activity Feed
          </Text>
        </View>

        <ScrollView
          style={styles.feedScrollView}
          contentContainerStyle={styles.feedContent}
          showsVerticalScrollIndicator={false}
        >
          {posts.map((post, index) => (
            <ActivityFeedPostCard
              key={index}
              userLocation={location}
              incidentCoordinates={post.coordinates}
              reporter={post.reporter}
              incidentType={post.incidentType}
              description={post.description}
              timestamp={post.timestamp.toString()} // Convert number to string
            />
          ))}

          {/* Empty view to add space at the bottom */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </Surface>
    </Surface>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    padding: 18,
    paddingTop: 32,
  },
  fullWidthMap: {
    width: screenWidth,
    height: 300,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  mapOverlay: {
    width: screenWidth,
    position: "absolute",
    top: 280,
    height: 50,
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
    backgroundColor: "#1d1c21",
  },
  overlayContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  overlayIcon: {
    marginRight: 8, // Space between icon and text
  },
  overlayText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    includeFontPadding: false, // Removes extra padding in text
  },
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1d1c21",
    marginTop: 310,
    overflow: "hidden",
  },
  feedHeader: {
    padding: 10,
  },
  feedTitle: {
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 0.5,
  },
  feedScrollView: {
    flex: 1,
  },
  feedContent: {
    paddingTop: 10,
    paddingBottom: 20, // Some padding at the bottom
  },
  bottomSpacer: {
    height: 320, // Additional space at the bottom
  },
});

export default HomeScreen;
