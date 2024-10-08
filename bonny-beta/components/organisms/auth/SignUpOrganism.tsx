import React, { useState } from "react";
import { Alert, SafeAreaView } from "react-native";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import {
  Button,
  Input,
  XStack,
  Text,
  Form,
  Spinner,
  View,
} from "tamagui";

interface SignUpOrganismProps {
  onClose: () => void;
}

const SignUpOrganism: React.FC<SignUpOrganismProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    const { error, data } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else if (data.user) {
      router.replace("/main/(tabs)");
    }
    setLoading(false);
  };

  return (
    <SafeAreaView>
      <View padding="$4">
        <Form
          onSubmit={handleSignUp}
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

          <Input
            size="$5"
            borderWidth="$1"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <XStack gap="$4">
            <Button
              borderWidth="$1"
              flex={1}
              size="$5"
              theme="dark_gray"
              onPress={onClose}
              disabled={loading}
            >
              Back
            </Button>

            <Form.Trigger asChild disabled={loading}>
              <Button
                borderWidth="$1"
                borderColor="$borderColor"
                flex={1}
                size="$5"
                theme="light"
                themeInverse
                icon={loading ? () => <Spinner /> : undefined}
              >
                Sign Up
              </Button>
            </Form.Trigger>
          </XStack>
        </Form>
      </View>
    </SafeAreaView>
  );
};

export default SignUpOrganism;
