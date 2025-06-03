import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Divider, Text } from "react-native-paper";

interface ContactItem {
  title: string;
  subtitle: string;
  phone: string;
  buttonColor: string;
}

interface EmergencyContactCardProps {
  icon: ComponentProps<typeof MaterialCommunityIcons>["name"];
  title: string;
  color: string;
  expanded: boolean;
  onToggle: () => void;
  items: ContactItem[];
}

const EmergencyContactCard = ({
  icon,
  title,
  color,
  expanded,
  onToggle,
  items,
}: EmergencyContactCardProps) => {
  return (
    <Card style={styles.card} onPress={onToggle}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: color }]}>
            <MaterialCommunityIcons name={icon} size={20} color="white" />
          </View>
          <Text variant="titleMedium" style={styles.title}>
            {title}
          </Text>
          <MaterialCommunityIcons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={24}
            color="#666"
          />
        </View>

        {expanded && (
          <View style={styles.expandedContent}>
            <Divider style={styles.divider} />
            {items.map((item, index) => (
              <View key={index} style={styles.contactItem}>
                <View>
                  <Text variant="bodyMedium" style={styles.contactTitle}>
                    {item.title}
                  </Text>
                  <Text variant="bodySmall" style={styles.contactSubtitle}>
                    {item.subtitle}
                  </Text>
                </View>
                <Button
                  mode="contained"
                  style={{ backgroundColor: item.buttonColor }}
                >
                  {item.phone}
                </Button>
              </View>
            ))}
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  cardContent: {
    padding: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    padding: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontWeight: "500",
  },
  expandedContent: {
    marginTop: 12,
  },
  divider: {
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  contactTitle: {
    fontWeight: "500",
  },
  contactSubtitle: {
    color: "#666",
  },
});

export default EmergencyContactCard;
