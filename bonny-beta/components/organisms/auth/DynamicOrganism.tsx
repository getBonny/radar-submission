import React, { useState } from "react";
import { Alert, SafeAreaView } from "react-native";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { Button, Input, XStack, Text, Form, Spinner, View } from "tamagui";
import { ReactNativeExtension } from "@dynamic-labs/react-native-extension";
import { createClient } from "@dynamic-labs/client";
import { sendEmailVerification, verifyEmail } from "@/services/dynamic/dynamic";

interface DynamicOrganismProps {
  onClose: () => void;
}

const DYNAMIC_ENVIRONMENT_ID = "afee04b9-7fc3-45c7-a66e-acb9ed0f9ca0";

const DynamicOrganism: React.FC<DynamicOrganismProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [uuid, setUuid] = useState("");
  const router = useRouter();

  const sendOtp = async () => {
    try {
      const uuid = await sendEmailVerification(email, DYNAMIC_ENVIRONMENT_ID);
      setUuid(uuid);
      setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      Alert.alert("An error occurred. Please try again.");
    }
  };

  const handleSendOTP = async () => {
    await sendOtp();
  };

  const handleResendOTP = async () => {
    await sendOtp();
  };

  const handleVerifyOTP = async () => {
    try {
      await verifyEmail(otp, uuid, DYNAMIC_ENVIRONMENT_ID);

      router.replace("/main/(tabs)");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Alert.alert("An error occurred. Please try again.");
    }
  };

  return (
    <SafeAreaView>
      <View padding="$4">
        {!otpSent ? (
          <Form
            onSubmit={handleSendOTP}
            gap="$4"
            backgroundColor="$background"
            borderRadius="$6"
            borderWidth="$1"
            borderColor="$borderColor"
            padding="$4"
          >
            <Text fontSize="$8" fontWeight="bold" textAlign="center">
              Sign Up
            </Text>

            <Input
              size="$5"
              borderWidth="$1"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <XStack gap="$4">
              <Button
                borderWidth="$1"
                flex={1}
                size="$5"
                theme="dark_gray"
                onPress={onClose}
              >
                Back
              </Button>

              <Form.Trigger asChild>
                <Button
                  borderWidth="$1"
                  borderColor="$borderColor"
                  flex={1}
                  size="$5"
                  theme="light"
                  themeInverse
                >
                  Next
                </Button>
              </Form.Trigger>
            </XStack>
          </Form>
        ) : (
          <Form
            onSubmit={handleVerifyOTP}
            gap="$4"
            backgroundColor="$background"
            borderRadius="$6"
            borderWidth="$1"
            borderColor="$borderColor"
            padding="$4"
          >
            <Input
              keyboardType="number-pad"
              maxLength={6}
              size="$5"
              borderWidth="$1"
              placeholder="OTP"
              value={otp}
              onChangeText={setOtp}
              autoCapitalize="none"
            />
            <XStack gap="$4">
              <Button
                borderWidth="$1"
                borderColor="$borderColor"
                flex={1}
                size="$5"
                theme="light"
                themeInverse
                onPress={handleResendOTP}
              >
                Resend
              </Button>

              <Form.Trigger asChild>
                <Button
                  borderWidth="$1"
                  borderColor="$borderColor"
                  flex={1}
                  size="$5"
                  theme="light"
                  themeInverse
                >
                  Next
                </Button>
              </Form.Trigger>
            </XStack>
          </Form>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DynamicOrganism;
