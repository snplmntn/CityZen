import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavDefaultTheme,
  ThemeProvider as NavThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

const DarkTheme = {
  ...NavDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: "#ff6666",
  },
};

// TODO: Match default colors with the Dark theme
const DefaultTheme = {
  ...NavDefaultTheme,
  ...PaperDefaultTheme,
};
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <NavThemeProvider value={theme}>
      <PaperProvider theme={theme}>
        <Stack initialRouteName="onboarding/Onboarding">
          <Stack.Screen
            name="onboarding/Onboarding"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="onboarding/login"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </NavThemeProvider>
  );
}
