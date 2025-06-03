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
      <Card.Content>
        <View style={styles.tipContent}>
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color="white"
            style={styles.tipIcon}
          />
          <View>
            <Text variant="titleMedium" style={styles.whiteText}>
              {title}
            </Text>
            <Text style={styles.tipText}>{description}</Text>
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
  },
  tipContent: {
    flexDirection: "row",
  },
  tipIcon: {
    marginRight: 12,
  },
  whiteText: {
    color: "white",
    fontWeight: "bold",
  },
  tipText: {
    color: "white",
    opacity: 0.8,
    marginTop: 4,
  },
});

export default SafetyTipCard;
