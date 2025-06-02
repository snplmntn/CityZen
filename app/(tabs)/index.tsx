import { useState, useEffect, useRef } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Avatar, Surface, Text, ActivityIndicator, Divider, useTheme } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useFetchLocation } from "@/hooks";
import ActivityFeedPostCard from "@/components/ActivityFeedPostCard";

// Sample posts
const posts = [
  {
    coordinates: {
      latitude: 14.695071430735512,
      longitude: 121.11781440740512
    },
    reporter: "CitiZen 1",
    incidentType: "fire",
    description: "A fire broke out at [address] because [reason]. [More details]",
    // Does JS output ISO8601 by default?
    timestamp: 1748870977000
  }
];

const HomeScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const { colors } = useTheme();

  useFetchLocation({ setLocation, setLocationPermission });
  
  // TODO: Add an auth check and guard routes
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

  // TODO: Change tags into scrollable view
  return (
    <Surface style={styles.rootContainer} elevation={0}>
      <View style={styles.heroWrapper}>
        <View>
          <MapView
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
              heading: 0
            }}
          >
          </MapView>
        </View>
        <View style={[styles.mapOverlay, {backgroundColor: "#222"}]}>
            <Text style={{ fontWeight: "bold" }}>
              <FontAwesome5 name="exclamation-triangle" size={12} color={colors.primary}/> 1.2km Nearby Incident
            </Text>
          </View>

      </View>
      <Surface 
        style={[styles.card, {backgroundColor: '#222'}]}
        elevation={5}
      >
        <Text variant="displaySmall" style={{ fontWeight: "bold" }}>
          Activity Feed
        </Text>
        <Divider style={{ margin: 16 }}/>
        {posts.map((post, index) => {
          return (
            <ActivityFeedPostCard
              key={index}
              userLocation={location}
              incidentCoordinates={post.coordinates}
              reporter={post.reporter}
              incidentType={post.incidentType}
              description={post.description}
              timestamp={post.timestamp}
            />
          );
        })}
      </Surface>
      <Text variant="displayLarge" style={{color: colors.primary}}></Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    padding: 18,
    paddingTop: 32
  },
  heroWrapper: {
    width: "100%",
    height: 300,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapOverlay: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    padding: 8,
    alignItems: "center"
  },
  card: {
    width: "100%",
    height: "100%",
    padding: 16
  },
  })

export default HomeScreen;
