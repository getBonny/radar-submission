import React from "react";
import { useRouter } from "expo-router";
import { Button, YStack, XStack, Text, Sheet } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import SignInOrganism from "@/components/organisms/auth/SignInOrganism";
import SignUpOrganism from "@/components/organisms/auth/SignUpOrganism";
import { useKeyboard } from "@react-native-community/hooks";
import { BlurView } from "expo-blur";
import { useAuth } from "@/context/authContext";
import DynamicOrganism from "@/components/organisms/auth/DynamicOrganism";

export default function FirstScreen() {
  const router = useRouter();
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const { keyboardShown } = useKeyboard();
  const { session } = useAuth();

  React.useEffect(() => {
    if (session) {
      router.replace("/main/(tabs)");
    }
  }, [session, router]);

  if (session) {
    return null;
  }

  return (
    <>
      <LinearGradient
        flex={1}
        justifyContent="space-between"
        padding="$4"
        colors={["$red10", "$purple10", "#3730a3", "#1e1b4b"]}
        start={[1, 0]}
        end={[0, 1]}
      >
        <YStack flex={1} justifyContent="flex-end">
          <Text
            fontSize="$12"
            lineHeight="$11"
            fontWeight="regular"
            textAlign="left"
            color="white"
            marginBottom="$8"
          >
            Take Control over your own Data
          </Text>

          <XStack gap="$4" marginBottom="$4">
            <Button
              flex={1}
              size="$6"
              theme="dark_gray"
              onPress={() => setOpenSignIn(true)}
              borderRadius="$6"
              borderWidth={"$1"}
              borderColor="$borderColor"
            >
              Login
            </Button>
            <Button
              flex={1}
              size="$6"
              theme="alt2"
              onPress={() => setOpenSignUp(true)}
              themeInverse
              borderRadius="$6"
            >
              Sign Up
            </Button>
          </XStack>
        </YStack>
      </LinearGradient>

      {/* Sign In Sheet */}
      <Sheet
        open={openSignIn}
        onOpenChange={setOpenSignIn}
        dismissOnSnapToBottom
        snapPoints={keyboardShown ? [80] : [40]}
        disableDrag={keyboardShown}
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          opacity={0.1}
        />

        <Sheet.Frame backgroundColor="transparent">
          <SignInOrganism onClose={() => setOpenSignIn(false)} />
        </Sheet.Frame>
      </Sheet>

      {/* Sign Up Sheet */}
      <Sheet
        open={openSignUp}
        onOpenChange={setOpenSignUp}
        dismissOnSnapToBottom
        snapPoints={keyboardShown ? [80] : [40]}
        disableDrag={keyboardShown}
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          opacity={0.1}
        />

        <Sheet.Frame backgroundColor="transparent">
          {/* <SignUpOrganism onClose={() => setOpenSignUp(false)} /> */}
          <DynamicOrganism onClose={() => setOpenSignUp(false)} />
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
