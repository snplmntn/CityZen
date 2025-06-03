
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabsLayout from "../(tabs)/_layout";

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  return (
    <Drawer.Navigator 
      id="drawer" 
      initialRouteName="tabs"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="tabs" component={TabsLayout} options={{ headerShown: false }}/>
    </Drawer.Navigator>
  );
}
