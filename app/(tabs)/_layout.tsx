import { useState } from "react";
import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import { Modal, View, Pressable } from "react-native";

const NavLayout = () => {
  const [pushNotifications, setPushNotifications] = useState<boolean>(false);
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: true,
        headerTitleStyle: { fontWeight: "bold" },
        headerRight: () => {
          return (
            <View style={{
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
                onPress={() => console.log("sidebar")}
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
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({color}) => <FontAwesome5 name="home" size={28} color={color} />
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          // TODO: add a floating circle button for the Map tab button
          title: "Map",
          headerShown: false,
          tabBarIcon: ({color}) => <FontAwesome5 name="map-marked-alt" size={28} color={color} />
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          // TODO: change explore icon?
          tabBarIcon: ({color}) => <FontAwesome5 name="broadcast-tower" size={28} color={color} />
        }}
      />
    </Tabs>
  );
}

export default NavLayout;
