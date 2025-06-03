import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

interface SafetyTipProps {
  icon: ComponentProps<typeof MaterialCommunityIcons>["name"];
  title: string;
  description: string;
  color: string;
}

const SafetyTipCard = ({ icon, title, description, color }: SafetyTipProps) => {
  return (
    <Card style={[styles.tipCard, { backgroundColor: color }]}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.tipContent}>
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color="white"
            style={styles.tipIcon}
          />
          <View style={styles.textContainer}>
            <Text
              variant="titleMedium"
              style={styles.whiteText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
            <Text style={styles.tipText} numberOfLines={3} ellipsizeMode="tail">
              {description}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  tipCard: {
    width: 260,
    marginRight: 12,
    elevation: 2,
    // Add minimum height to ensure consistent card sizes
    minHeight: 110,
  },
  cardContent: {
    padding: 12, // Slightly reduce padding to give more space for content
  },
  tipContent: {
    flexDirection: "row",
    alignItems: "flex-start", // Align items to the top
  },
  textContainer: {
    flex: 1, // Take up remaining space
    flexShrink: 1, // Allow the text container to shrink if needed
  },
  tipIcon: {
    marginRight: 12,
    marginTop: 2, // Slight adjustment to align with text
  },
  whiteText: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 4, // Add some space between title and description
  },
  tipText: {
    color: "white",
    opacity: 0.8,
    fontSize: 13, // Slightly smaller text for description
    lineHeight: 18, // Improve readability with better line height
  },
});

export default SafetyTipCard;
