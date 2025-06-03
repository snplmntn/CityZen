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
            <IconButton icon="bell" size={24} onPress={onNotificationPress} />
            <IconButton icon="menu" size={32} onPress={onMenuPress} />
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
    padding: 16,
  },
  headerTitle: {
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default TopBar;
