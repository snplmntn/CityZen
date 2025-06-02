import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavDefaultTheme,
  ThemeProvider as NavThemeProvider
} from "@react-navigation/native";
import { 
  Provider as PaperProvider,
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperDefaultTheme,
} from "react-native-paper"
import { useColorScheme } from "react-native";
import { Stack } from "expo-router";

const DarkTheme = {
  ...NavDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: 'red'
  }
}

// TODO: Match default colors with the Dark theme
const DefaultTheme = {
  ...NavDefaultTheme,
  ...PaperDefaultTheme
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  return (
    <NavThemeProvider value={theme}>
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </NavThemeProvider>
  );
}
