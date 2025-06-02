import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";

const { width } = Dimensions.get("window");

const onboardingScreens = [
  {
    id: "1",
    title: "Welcome to CityZen",
    subtitle: "Your community safety companion",
    description:
      "Join thousands of citizens making their neighborhoods safer through real-time incident reporting and alerts.",
    image: require("../assets/images/safety.jpg"),
  },
  {
    id: "2",
    title: "Real-time Alerts",
    subtitle: "Stay informed, stay safe",
    description:
      "Receive instant notifications about incidents in your area. From traffic accidents to emergencies, we keep you in the loop.",
    image: require("../assets/images/safety.jpg"),
  },
  {
    id: "3",
    title: "Report Incidents",
    subtitle: "Make a difference",
    description:
      "Easily report incidents with our AI-powered system. Take photos or videos, and our technology will help categorize and verify the information.",
    image: "https://via.placeholder.com/300.png?text=CityZen",
  },
  {
    id: "4",
    title: "Community Verification",
    subtitle: "Crowdsourced accuracy",
    description:
      "Our unique verification system allows community members to confirm or dispute reported incidents, ensuring information accuracy.",
    image:
      "https://readdy.ai/api/search-image?query=Modern%20minimalist%20illustration%20of%20multiple%20user%20profiles%20with%20checkmarks&width=300&height=300",
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
    <View style={styles.container}>
      <FlatList
        data={onboardingScreens}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        onMomentumScrollEnd={() => {
          if (currentIndex === onboardingScreens.length - 1) {
            setTimeout(() => {
              handleFinish();
            }, 1500);
          }
        }}
      />

      {/* Dot indicators */}
      <View style={styles.dotsContainer}>
        {onboardingScreens.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    width,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    margin: 5,
  },
  activeDot: {
    backgroundColor: "#000",
    width: 12,
    height: 12,
  },
});
