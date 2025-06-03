import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";

interface TopBarProps {
  title: string;
  onMenuPress: () => void;
  onNotificationPress?: () => void;
  rightContent?: React.ReactNode;
}

const TopBar = ({
  title,
  onMenuPress,
  onNotificationPress = () => {},
  rightContent,
}: TopBarProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.header}>
      <Text variant="headlineSmall" style={styles.headerTitle}>
        {title}
      </Text>
      <View style={styles.headerIcons}>
        {rightContent || (
          <>
            <IconButton
              icon="bell"
              size={24}
              onPress={onNotificationPress}
              style={styles.icon}
              iconColor={colors.primary}
            />
            <IconButton
              icon="menu"
              size={35} // Made consistent with the bell icon
              onPress={onMenuPress}
              style={styles.icon}
              iconColor={colors.primary}
            />
          </>
        )}
      </View>
    </View>
  );
};

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <TopBar
        title="Your Title"
        onMenuPress={() => {
          /* handler */
        }}
      />
      <ScrollView contentContainerStyle={{ paddingTop: 64 }}>
        {/* Your scrollable content here */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0, // Add this: stick to the top
    left: 0, // Add this: start from left edge
    right: 0, // Add this: extend to right edge
    width: "100%", // Add this: ensure full width
    zIndex: 100, // Add this: ensure it shows above other elements
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 64,
    backgroundColor: "#121212",
  },
  headerTitle: {
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center", // Ensure vertical alignment
  },
  height: 48, // Fixed height container for icons
});

export default App;
