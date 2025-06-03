import { StyleSheet, View } from "react-native";
import { Button, Card, Chip, Text } from "react-native-paper";

interface VolunteerCardProps {
  title: string;
  organization: string;
  hours: string;
  type: string;
  typeColor: string;
}

const VolunteerCard = ({
  title,
  organization,
  hours,
  type,
  typeColor,
}: VolunteerCardProps) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Chip
          style={[styles.chip, { backgroundColor: typeColor }]}
          textStyle={{ color: "white" }}
        >
          {type}
        </Chip>
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
        <View style={styles.details}>
          <Text variant="bodyMedium" style={styles.organization}>
            {organization}
          </Text>
          <Text variant="bodyMedium" style={styles.hours}>
            {hours}
          </Text>
        </View>
        <Button mode="outlined" style={styles.button}>
          Apply
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
  },
  chip: {
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  title: {
    fontWeight: "500",
    marginBottom: 8,
  },
  details: {
    marginBottom: 12,
  },
  organization: {
    color: "#64748B",
  },
  hours: {
    color: "#64748B",
  },
  button: {
    alignSelf: "flex-start",
  },
});

export default VolunteerCard;
