import { StyleSheet } from "react-native";
import { Button, Card, Chip, Text } from "react-native-paper";

interface LegalResourceProps {
  title: string;
  description: string;
  type: string;
}

const LegalResourceCard = ({
  title,
  description,
  type,
}: LegalResourceProps) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Chip style={styles.chip}>{type}</Chip>
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          {description}
        </Text>
        <Button mode="outlined" style={styles.button}>
          Learn More
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  chip: {
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  title: {
    fontWeight: "500",
    marginBottom: 4,
  },
  description: {
    color: "#64748B",
    marginBottom: 12,
  },
  button: {
    alignSelf: "flex-start",
  },
});

export default LegalResourceCard;
