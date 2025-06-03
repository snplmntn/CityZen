import { Image, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

const CampaignCard = () => {
  return (
    <Card style={styles.card}>
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqHnXKrIuW8LZR9A1tprqj96Qrw4i4WykGBg&s",
        }}
        style={styles.image}
      />
      <Card.Content style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Featured</Text>
        </View>
        <Text variant="titleLarge" style={styles.title}>
          Safety Awareness Week
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          Join our community campaign to promote road safety and emergency
          preparedness.
        </Text>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text variant="bodyLarge" style={styles.statNumber}>
              156
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Participants
            </Text>
          </View>
          <View style={styles.stat}>
            <Text variant="bodyLarge" style={styles.statNumber}>
              5
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Days left
            </Text>
          </View>
        </View>
        <Button mode="contained" style={styles.button}>
          Join Campaign
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    marginBottom: 16,
  },
  image: {
    height: 160,
    width: "100%",
  },
  content: {
    padding: 16,
  },
  badge: {
    position: "absolute",
    top: -148,
    right: 16,
    backgroundColor: "#3B82F6",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    color: "#64748B",
    marginBottom: 16,
  },
  stats: {
    flexDirection: "row",
    marginBottom: 16,
  },
  stat: {
    marginRight: 24,
  },
  statNumber: {
    fontWeight: "bold",
    color: "#3B82F6",
  },
  statLabel: {
    color: "#64748B",
  },
  button: {
    alignSelf: "flex-start",
  },
});

export default CampaignCard;
