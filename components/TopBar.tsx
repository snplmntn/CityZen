import React from "react";
import { StyleSheet, View } from "react-native";
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

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 64, // Fixed height for consistency
  },
  headerTitle: {
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center", // Ensure vertical alignment
    height: 48, // Fixed height container for icons
  },
  icon: {
    margin: 0, // Remove default margins
    marginLeft: 8, // Add consistent spacing between icons
  },
});

export default TopBar;
