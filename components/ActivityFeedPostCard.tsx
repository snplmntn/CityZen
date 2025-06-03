import { View, StyleSheet } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import haversine from "haversine";
import { useFetchAddress } from "@/hooks";

type Props = {
  userLocation: Location.LocationObject,
  incidentCoordinates: {
    latitude: number,
    longitude: number
  },
  reporter: string,
  incidentType: "fire" | "car-crash", // Add more types
  description: string,
  timestamp: string
}

// TODO: Refactor (DRY)
const incidentTypes = [
  {slug: "fire", icon: "fire", text: "Fire"},
  {slug: "car-crash", icon: "car-crash", text: "Car Crash"},
  {slug: "crime", icon: "bomb", text: "Crime"},
  {slug: "mechanical-failure", icon: "cogs", text: "Mechanical Failure"},
  {slug: "collapsed-structure", icon: "building", text: "Collapsed Structure"},
];


const ActivityFeedPostCard = ({
  userLocation,
  incidentCoordinates,
  reporter,
  incidentType,
  description,
  timestamp
}: Props) => {
  const { colors } = useTheme();
  const address = useFetchAddress(incidentCoordinates.latitude, incidentCoordinates.longitude);
  return (
    <Surface style={{ padding: 8, width: "100%", backgroundColor: "#222" }} elevation={0}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <FontAwesome5 name="user-circle" size={32} color={colors.primary} />
          <View style={{ marginLeft: 8 }}>
            <Text>{reporter}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5 name="user-check" size={8} color={colors.primary} />
              <Text style={{ fontSize: 8, marginLeft: 2 }}>Verified User</Text>
            </View>
          </View>
        </View>
        <View style={{ position: "absolute", right: 0 }}>
          <View style={{ flexDirection: "row", gap: 8, justifyContent: "center" }}>
            {/* 
              TODO: Refactor styles
              TODO: Fix styling (Current style is prone to breaking) 
              TODO: Make icons pressable
            */}
            <FontAwesome5 name="times" size={16} color="white" />
            <FontAwesome5 name="check" size={16} color="white" />
          </View>
          <Text style={{ fontSize: 12 }}>Is this true?</Text>
        </View>
      </View>
      <View>
        <View style={styles.postMapWrapper}>
          <MapView
            style={styles.map}
            showsMyLocationButton={false}
            scrollEnabled={false}
            camera={{
              center: {
                latitude: incidentCoordinates.latitude,
                longitude: incidentCoordinates.longitude,
              },
              zoom: 18,
              pitch: 0,
              heading: 0
            }}
          >
            <Marker 
              coordinate={{
                latitude: incidentCoordinates.latitude,
                longitude: incidentCoordinates.longitude,
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
              {haversine(
                {
                  latitude: userLocation.coords.latitude,
                  longitude: userLocation.coords.longitude
                },
                {
                  latitude: incidentCoordinates.latitude,
                  longitude: incidentCoordinates.longitude
                },
                { unit: "km" }
              ).toFixed(2)} km Away
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5 
              name={incidentTypes.find((type) => type.slug === incidentType).icon}
              size={16}
              color={colors.primary}
            />
            <Text style={{ marginLeft: 4 }}>
              {incidentTypes.find((type) => type.slug === incidentType).text}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome5 name="map-marker" size={16} color={colors.primary} />
          <Text style={{ marginLeft: 4 }}>
            {address}
          </Text>
        </View>
        <Text style={{ marginTop: 8 }}>
          {description}
        </Text>
        <Text style={{ marginTop: 8, color: "gray", fontSize: 12}}>
          Reported {new Date(timestamp).toLocaleString("en-US", {
            hour12: true
          })}
        </Text>
      </View>
    </Surface>
  );
}

export default ActivityFeedPostCard;

const styles = StyleSheet.create({
  postHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "center"
  },
  userInfo: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  postMapWrapper: {
    width: "100%",
    height: 128,
    borderRadius: 18,
    overflow: "hidden"
  },
  map: {
    width: "100%",
    height: "100%",
  },
})
