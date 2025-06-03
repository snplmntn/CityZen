import { StyleSheet, View } from "react-native";
import { Card, ProgressBar, RadioButton, Text } from "react-native-paper";

interface PollOption {
  id: number;
  text: string;
}

interface PollCardProps {
  question: string;
  options: PollOption[];
  votes: number;
  selectedOption: number | null;
  onSelect: (index: number) => void;
}

const PollCard = ({
  question,
  options,
  votes,
  selectedOption,
  onSelect,
}: PollCardProps) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.question}>
          {question}
        </Text>

        <View style={styles.optionsContainer}>
          {options.map((option) => {
            const isSelected = selectedOption === option.id;
            const progress = isSelected ? 0.7 : 0.3; // Demo progress values

            return (
              <View key={option.id} style={styles.optionRow}>
                <RadioButton
                  value={option.id.toString()}
                  status={isSelected ? "checked" : "unchecked"}
                  onPress={() => onSelect(option.id)}
                />
                <View style={styles.optionContent}>
                  <Text style={styles.optionText}>{option.text}</Text>
                  <ProgressBar
                    progress={progress}
                    color={isSelected ? "#3B82F6" : "#CBD5E1"}
                    style={styles.progressBar}
                  />
                </View>
                <Text style={styles.percentage}>
                  {Math.round(progress * 100)}%
                </Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.voteCount}>{votes} votes • 2 days left</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  question: {
    fontWeight: "500",
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 8,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionContent: {
    flex: 1,
    marginLeft: 8,
    marginRight: 12,
  },
  optionText: {
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  percentage: {
    color: "#64748B",
  },
  voteCount: {
    color: "#64748B",
    marginTop: 16,
    fontSize: 12,
  },
});

export default PollCard;
