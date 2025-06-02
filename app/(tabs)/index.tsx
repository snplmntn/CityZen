import { useState, useEffect, useRef } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Avatar, Surface, Text, ActivityIndicator, Divider, useTheme } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useFetchLocation } from "@/hooks";

const HomeScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const { colors } = useTheme();

  useFetchLocation({setLocation, setLocationPermission});
  
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
        <Post />
      </Surface>
      <Text variant="displayLarge" style={{color: colors.primary}}></Text>
    </Surface>
  );
}

// TODO: refactor into a separate file and make fields dynamic
const Post = () => {
  const { colors } = useTheme();
  const mapRef = useRef(null);
  return (
    <Surface style={{ padding: 8, width: "100%" }}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <FontAwesome5 name="user-circle" size={32} color={colors.primary} />
          <View style={{ marginLeft: 8 }}>
            <Text>CitiZen 1</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5 name="user-check" size={8} color={colors.primary} />
              <Text style={{ fontSize: 8, marginLeft: 2 }}>Verified User</Text>
            </View>
          </View>
        </View>
        <View style={{ position: "absolute", right: 0 }}>
          <View style={{ flexDirection: "row", gap: 8, justifyContent: "center" }}>
            { /* TODO: Fix styling (Current style is prone to breaking) */}
            <FontAwesome5 name="times" size={16} color="white" />
            <FontAwesome5 name="check" size={16} color="white" />
          </View>
          <Text style={{ fontSize: 12 }}>Is this true?</Text>
        </View>
      </View>
      <View>
        <View style={styles.postMapWrapper}>
          <MapView
            mapRef={mapRef}
            style={styles.map}
            showsMyLocationButton={false}
            scrollEnabled={false}
            camera={{
              center: {
                latitude: 37.78825,
                longitude: -122.4324,
              },
              zoom: 15,
              pitch: 0,
              heading: 0
            }}
          >
            <Marker 
              coordinate={{
                latitude: 37.78825,
                longitude: -122.4324,
              }}
            />
          </MapView>
        </View>
        <View 
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}
        >
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5 name="location-arrow" size={16} color={colors.primary} />
            <Text style={{ marginLeft: 4 }}>
              1.2km Away
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5 name="fire" size={16} color={colors.primary} />
            <Text style={{ marginLeft: 4 }}>
              Fire
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome5 name="map-marker" size={16} color={colors.primary} />
          <Text style={{ marginLeft: 4 }}>
            #123 Main St, Sta Mesa, Manila
          </Text>
        </View>
        <Text style={{ marginTop: 8 }}>
          A fire broke out at [address] because [reason]. [More details]
        </Text>
        <Text style={{ marginTop: 8, color: "gray", fontSize: 12}}>
          Reported 15 minutes ago
        </Text>
      </View>
    </Surface>
  );
}

// TODO: 
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
  userInfo: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  postHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "center"
  },
  postMapWrapper: {
    width: "100%",
    height: 128,
    borderRadius: 18,
    overflow: "hidden"
  },
})

export default HomeScreen;
