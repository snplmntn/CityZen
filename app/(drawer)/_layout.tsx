
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  return (
    <Drawer.Navigator 
      id="drawer" 
      initialRouteName="tabs"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="tabs" options={{ headerShown: false }}/>
    </Drawer.Navigator>
  );
}
