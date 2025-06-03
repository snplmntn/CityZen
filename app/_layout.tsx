import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavDefaultTheme,
  ThemeProvider as NavThemeProvider,
  Theme,
} from "@react-navigation/native";
import * as Location from "expo-location";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Update your DarkTheme and DefaultTheme objects
const DarkTheme = {
  ...NavDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: "#ff6666",
    background: PaperDarkTheme.colors.background,
    card: NavDarkTheme.colors.card,
    text: NavDarkTheme.colors.text,
    border: NavDarkTheme.colors.border,
    notification: NavDarkTheme.colors.notification,
  },
  // Add missing font properties
  fonts: {
    ...PaperDarkTheme.fonts,
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal",
    },
    bold: {
      fontFamily: "sans-serif",
      fontWeight: "bold",
    },
    heavy: {
      fontFamily: "sans-serif",
      fontWeight: "900",
    },
  },
};

const DefaultTheme = {
  ...NavDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background: PaperDefaultTheme.colors.background,
    card: NavDefaultTheme.colors.card,
    text: NavDefaultTheme.colors.text,
    border: NavDefaultTheme.colors.border,
    notification: NavDefaultTheme.colors.notification,
  },
  // Add missing font properties
  fonts: {
    ...PaperDefaultTheme.fonts,
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal",
    },
    bold: {
      fontFamily: "sans-serif",
      fontWeight: "bold",
    },
    heavy: {
      fontFamily: "sans-serif",
      fontWeight: "900",
    },
  },
};
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  useEffect(() => {
    (async () => {
      // Request location permissions on app start
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Location permission status:", status);
    })();
  }, []);

  return (
    <NavThemeProvider value={theme as Theme}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
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
          </SafeAreaView>
        </SafeAreaProvider>
      </PaperProvider>
    </NavThemeProvider>
  );
}
