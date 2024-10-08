import React from "react";
import { Redirect, Tabs, useRouter } from "expo-router";
import { Home, Camera, User, File } from "@tamagui/lucide-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { Button, Sheet, Text, YStack } from "tamagui";
import ScanTypeOrganism from "@/components/organisms/scan/ScanTypeOrganism";
import { TransactionProvider } from "@/context/transactionContext";
import { useAuth } from "@/context/authContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [sheetOpen, setSheetOpen] = React.useState(false);

  return (
    <>
      {/* Tab Bar */}
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          tabBarInactiveTintColor:
            Colors[colorScheme ?? "light"].tabIconDefault,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="placeholder"
          options={{
            title: "Scan Receipt",
            tabBarIcon: ({ color }) => (
              <Button
                size="$8"
                circular
                borderWidth="$1.1"
                borderColor="$borderColor"
                icon={<Camera color={color} size={24} />}
                onPress={() => setSheetOpen(true)}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setSheetOpen(true);
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
      </Tabs>

      {/* Scan Receipt Sheet */}
      <Sheet
        open={sheetOpen}
        snapPoints={[35]}
        dismissOnSnapToBottom
        onOpenChange={setSheetOpen}
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          opacity={0.1}
        />

        <Sheet.Frame backgroundColor="transparent" height="100%">
          <ScanTypeOrganism onClose={() => setSheetOpen(false)} />
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
