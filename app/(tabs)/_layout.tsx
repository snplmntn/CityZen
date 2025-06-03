import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import SidebarMenu from "../../components/SidebarMenu"; // Import SidebarMenu

const NavLayout = () => {
  const [pushNotifications, setPushNotifications] = useState<boolean>(false);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false); // Add state for sidebar
  const { colors } = useTheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          headerShown: true,
          headerTitleStyle: { fontWeight: "bold" },
          headerRight: () => {
            return (
              <View
                style={{
                  marginRight: 16,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableRipple
                  onPress={() => setPushNotifications(!pushNotifications)}
                  rippleColor="rgba(255, 255, 255, .20)"
                >
                  <FontAwesome5
                    name="bell"
                    size={24}
                    color="white"
                    style={{ padding: 16 }}
                  />
                </TouchableRipple>
                <TouchableRipple
                  onPress={() => setSidebarVisible(true)} // Open sidebar when bars icon is clicked
                  rippleColor="rgba(255, 255, 255, .20)"
                >
                  <FontAwesome5
                    name="bars"
                    size={24}
                    color="white"
                    style={{ padding: 16 }}
                  />
                </TouchableRipple>
              </View>
            );
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="home" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: "Map",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="map-marked-alt" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="broadcast-tower" size={28} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* Add SidebarMenu component */}
      <SidebarMenu
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        userName="wakeywakey"
      />
    </>
  );
};

export default NavLayout;
