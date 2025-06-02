import { StyleSheet } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";

const HomeScreen = () => {
  const { colors } = useTheme();
  return (
    <Surface style={styles.rootContainer} elevation={0}>
      <Text variant="displayLarge" style={{color: colors.primary}}>Hello</Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: "center",
    padding: 12
  }
})

export default HomeScreen;
