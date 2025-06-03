import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider, Portal, Surface } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SidebarMenuProps {
  visible: boolean;
  onClose: () => void;
  userName?: string;
}

// Get full screen dimensions
const { width, height } = Dimensions.get("screen"); // Use screen instead of window
const SIDEBAR_WIDTH = width * 0.85;
const SidebarMenu = ({
  visible,
  onClose,
  userName = "User",
}: SidebarMenuProps) => {
  const router = useRouter();
  const translateX = useRef(new Animated.Value(SIDEBAR_WIDTH)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const isAnimating = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0) return; // Prevent dragging to the right
        translateX.setValue(SIDEBAR_WIDTH + gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -SIDEBAR_WIDTH / 3) {
          // If dragged more than 1/3 of the sidebar width, close it
          closeMenu();
        } else {
          // Otherwise snap back
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 0,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      // Reset position before animating
      translateX.setValue(SIDEBAR_WIDTH);

      // Small delay for smoother animation
      setTimeout(() => {
        openMenu();
      }, 10);
    } else {
      closeMenu();
    }
  }, [visible]);

  const openMenu = () => {
    isAnimating.current = true;
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      isAnimating.current = false;
    });
  };

  const closeMenu = () => {
    isAnimating.current = true;
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: SIDEBAR_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      isAnimating.current = false;
      if (visible) onClose();
    });
  };

  // Navigation function with type assertion
  const navigateTo = (route: string) => {
    onClose();
    router.push(route as never);
  };

  // First, let's create an interface for menu items
  interface MenuItem {
    icon: string;
    label: string;
    route?: string;
    divider: boolean;
    value?: string; // Make the value property optional
  }

  // Then update your menuItems array to use this type
  const menuItems: MenuItem[] = [
    {
      icon: "user-circle",
      label: "Account",
      route: "/(tabs)/account",
      divider: false,
    },
    {
      icon: "check-circle",
      label: "Verification",
      route: "/(tabs)/verification",
      divider: false,
    },
    {
      icon: "cog",
      label: "Settings and Privacy",
      route: "/(tabs)/settings",
      divider: false,
    },
    {
      icon: "question-circle",
      label: "Help Center",
      route: "/(tabs)/help",
      divider: false,
    },
    {
      icon: "info-circle",
      label: "About",
      route: "/(tabs)/about",
      divider: false,
    },
  ];

  // Don't use _value directly as it's a private property
  if (!visible && !isAnimating.current) {
    return null; // Don't render anything if not visible and fully offscreen
  }

  return (
    <Portal>
      {/* Semi-transparent backdrop covering the entire screen */}
      <Animated.View
        style={[styles.backdrop, { opacity }]}
        onTouchStart={onClose}
      />

      {/* Sidebar panel - now spans full height */}
      <Animated.View
        style={[styles.container, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        <Surface
          style={[
            styles.surface,
            {
              paddingTop:
                insets.top > 0
                  ? insets.top + 10
                  : (StatusBar.currentHeight ?? 20) + 20,
              paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 30,
            },
          ]}
        >
          {/* Header with profile and close button */}
          <View style={styles.header}>
            <View style={styles.profileSection}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <FontAwesome name="user" size={32} color="#fff" />
                </View>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{userName}</Text>
                <Text style={styles.userStatus}>Online</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <MaterialCommunityIcons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <Divider style={styles.headerDivider} />

          {/* Menu Items */}
          <View style={styles.menuItems}>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => item.route && navigateTo(item.route)}
                  disabled={!item.route}
                >
                  <FontAwesome
                    name={item.icon as any}
                    size={20}
                    color="#fff"
                    style={styles.menuIcon}
                  />
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  {"value" in item && (
                    <Text style={styles.menuValue}>{item.value as string}</Text>
                  )}
                </TouchableOpacity>
                {item.divider && <Divider style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>

          {/* Log Out Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => router.replace("/onboarding/login" as never)}
          >
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </Surface>
      </Animated.View>
    </Portal>
  );
};

// Update these styles to use much higher zIndex values
const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
    zIndex: 99999, // Further increased
    elevation: 15, // Add elevation for Android
  },
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    width: SIDEBAR_WIDTH,
    height: height, // Uses full screen height
    zIndex: 100000, // Further increased
    elevation: 16, // Higher elevation than backdrop
  },
  surface: {
    flex: 1,
    backgroundColor: "#222222",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20, // Reduced from 30 to account for divider
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    justifyContent: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  userStatus: {
    color: "#aaa",
    fontSize: 14,
  },
  closeButton: {
    padding: 5,
  },
  headerDivider: {
    backgroundColor: "rgba(255,255,255,0.15)",
    marginBottom: 20,
    height: 1,
    marginHorizontal: -20, // This extends beyond the padding to reach the edges
    width: SIDEBAR_WIDTH, // Make it the full width of the sidebar
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuIcon: {
    marginRight: 15,
    width: 24,
    textAlign: "center",
  },
  menuLabel: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
  },
  menuValue: {
    color: "#aaa",
    fontSize: 14,
  },
  divider: {
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 8,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 12,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SidebarMenu;
