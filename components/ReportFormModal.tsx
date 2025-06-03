import { useState } from "react";
import { Modal, View, StyleSheet } from "react-native";
import { Button, TouchableRipple, Surface, Text, TextInput, useTheme } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import { useFetchAddress } from "@/hooks";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Location from "expo-location";

type Props = {
  posts: any;
  location: Location.LocationObject;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

// Add more types
const incidentTypes = [
  {slug: "fire", icon: "fire", text: "Fire"},
  {slug: "car-crash", icon: "car-crash", text: "Car Crash"},
  {slug: "crime", icon: "bomb", text: "Crime"},
  {slug: "mechanical-failure", icon: "cogs", text: "Mechanical Failure"},
  {slug: "collapsed-structure", icon: "building", text: "Collapsed Structure"},
];

const ReportFormModal = ({ posts, setPosts, location, visible, setVisible }: Prop) => {
  const [description, setDescription] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<Record<string, number>>(location.coords);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { colors } = useTheme();

  return (
    <Modal
      animationType="slide"
      visible={visible}
      backdropColor="#00000022"
      onRequestClose={() => setVisible(false)}
    >
      <Surface style={styles.baseContainer}>
        <View style={styles.header}>
          <Text variant="displaySmall" style={{ fontWeight: "bold" }}>Incident Details</Text>
          <TouchableRipple
            rippleColor="rgba(255, 255, 255, .32)"
            style={{ padding: 8, borderRadius: 16 }}
            onPress={() => setVisible(false)}
          >
            <FontAwesome5 name="times" size={32} color="white" />
          </TouchableRipple>
        </View>
        <View>
          <Text style={styles.mutedText}>Pin Location</Text>
          <View style={styles.postMapWrapper}>
            <MapView
              style={{ width: "100%", height: "100%" }}
              showsMyLocationButton={false}
              initialCamera={{
                center: {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                },
                zoom: 17,
                pitch: 0,
                heading: 0
              }}
            >
              <Marker 
                draggable
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                onDragEnd={(e) => setCoordinates(e.nativeEvent.coordinate)}
              />
            </MapView>
          </View>
        </View>
        <View>
          <Text style={styles.mutedText}>Incident Type</Text>
          <View style={styles.incidentTypeContainer}>
            {incidentTypes.map((incidentType) => {
              return (
                <TouchableRipple
                  key={incidentType.slug}
                  style={styles.incidentType}
                  rippleColor="rgba(255, 255, 255, .12)"
                  onPress={() => setSelectedType(incidentType.slug)}
                >
                  <FontAwesome5
                    name={incidentType.icon}
                    size={32}
                    color={incidentType.slug === selectedType 
                      ? colors.primary 
                      : "white"
                    }
                  />
                </TouchableRipple>
              );
            })}
          </View>
          <Text style={[styles.mutedText, styles.centered]}>
            {incidentTypes.find((incidentType) => incidentType.slug === selectedType)?.text ?? ""}
          </Text>
        </View>
        <View>
          <Text style={styles.mutedText}>Description</Text>
          <TextInput
            multiline={true}
            numberOfLines={8}
            style={{ marginBottom: 32}}
            onChangeText={(e) => setDescription(e)}
          />
        </View>
        <Button mode="contained" onPress={() => {
          if (coordinates === null || selectedType === null || description === null) return;
          const payload = {
            id: posts.length + 1,
            coordinates: coordinates,
            reporter: "User",
            incidentType: selectedType,
            description: description,
            timestamp: Date.now()
          }
          setPosts((prev) => {
            return [...prev, payload];
          })
          setVisible(false);
        }}>
          Submit
        </Button>
      </Surface>
    </Modal>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: "#222",
    borderRadius: 32,
    padding: 32,
    position: "absolute",
    bottom: 0,
    width: "100%"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  incidentTypeContainer: {
    width: "100%",
    backgroundColor: "#333",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 16,
    marginBottom: 4
  },
  incidentType: {
    padding: 12,
  },
  centered: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  mutedText: {
    color: "#AAA",
    fontSize: 12,
    marginBottom: 4
  },
  postMapWrapper: {
    width: "100%",
    height: 128,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 8
  },

});



export default ReportFormModal;
