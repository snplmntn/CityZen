import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";

const { width } = Dimensions.get("window");

const onboardingScreens = [
  {
    id: "1",
    title: "Welcome CityZen",
    subtitle: "Your community safety companion",
    description:
      "Join thousands of citizens making their neighborhoods safer through real-time incident reporting and alerts.",
    image: require("../../assets/images/zen.png"),
  },
  {
    id: "2",
    title: "Real-time Alerts",
    subtitle: "Stay informed, stay safe",
    description:
      "Receive instant notifications about incidents in your area. From traffic accidents to emergencies, we keep you in the loop.",
    image: require("../../assets/images/zen2.png"),
  },
  {
    id: "3",
    title: "Report Incidents",
    subtitle: "Make a difference",
    description:
      "Easily report incidents with our AI-powered system. Take photos or videos, and our technology will help categorize and verify the information.",
    image: require("../../assets/images/zen3.png"),
  },
  {
    id: "4",
    title: "Community Verification",
    subtitle: "Crowdsourced accuracy",
    description:
      "Our unique verification system allows community members to confirm or dispute reported incidents, ensuring information accuracy.",
    image: require("../../assets/images/zen4.png"),
  },
  {
    id: 5,
    title: "Interactive Maps",
    subtitle: "Visualize safety information",
    description:
      "View incident hotspots, safe routes, and emergency services on our interactive map. Plan your movements with confidence.",
    image: require("../../assets/images/zen5.png"),
  },
];

const Onboarding = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index || 0);
      }
    }
  ).current;

  const handleFinish = async () => {
    await AsyncStorage.setItem("onboarding-complete", "true");
    router.replace("/");
  };

  return (
    <LinearGradient
      colors={["#1e3a8a", "#000000"]} // blue-900 to black
      style={styles.gradient}
    >
      <FlatList
        data={onboardingScreens}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image
              source={
                typeof item.image === "string"
                  ? { uri: item.image }
                  : item.image
              }
              style={styles.image}
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      <View style={styles.dotsContainer}>
        {onboardingScreens.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleFinish}>
          <Text style={styles.primaryButtonText}>Get started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.replace("/onboarding/login")}
        >
          <Text style={styles.secondaryButtonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  slide: {
    width,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },

  image: {
    width: 225,
    height: 225,
    resizeMode: "contain",
    marginBottom: 60,
    opacity: 0.8,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 6,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 20,
    color: "#ccc",
    marginBottom: 10,
    textAlign: "center",
  },

  description: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 80,
    width: "100%",
    zIndex: 10,
  },

  dot: {
    width: 15,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#4b5563",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: "#2563eb",
    width: 30,
    height: 4,
    borderRadius: 2,
  },

  buttonContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    paddingHorizontal: 24,
  },

  primaryButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 14,
    borderRadius: 10,
    borderColor: "#ccc",
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
