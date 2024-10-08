import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import {
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  Inter_600SemiBold,
  Inter_500Medium,
  Inter_400Regular,
  Inter_300Light,
  Inter_200ExtraLight,
  Inter_100Thin,
  useFonts,
} from "@expo-google-fonts/inter";

import { useColorScheme } from "@/hooks/useColorScheme";
import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "../tamagui.config";
import { AuthProvider, useAuth } from "@/context/authContext";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";

import { SolanaWalletConnectors } from "@dynamic-labs/solana";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter_900Black,
    Inter_800ExtraBold,
    Inter_700Bold,
    Inter_600SemiBold,
    Inter_500Medium,
    Inter_400Regular,
    Inter_300Light,
    Inter_200ExtraLight,
    Inter_100Thin,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <DynamicContextProvider settings={{
        environmentId: "afee04b9-7fc3-45c7-a66e-acb9ed0f9ca0",
        walletConnectors: [SolanaWalletConnectors],
      }}>
        <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name="index" options={{ title: "Auth", headerShown: false }} />
              <Stack.Screen name="main" options={{ title: "Home", headerShown: false }} />
              <Stack.Screen name="+not-found" options={{ title: "Not Found", headerShown: false }} />
            </Stack>
          </ThemeProvider>
        </TamaguiProvider>
      </DynamicContextProvider>
    </AuthProvider>
  );
}
