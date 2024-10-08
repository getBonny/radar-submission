
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
import { useAuth } from "@/context/authContext";

interface SignInOrganismProps {
    onClose: () => void;
  }

const SignInOrganism: React.FC<SignInOrganismProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setSession } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else if (data.user) {
      setSession(data.session);
      router.replace("/main/(tabs)");
    }
    setLoading(false);
  };

  return (
    <SafeAreaView>
      <View padding="$4">
        <Form
          onSubmit={handleLogin}
          gap="$4"
          backgroundColor="$background"
          borderRadius="$6"
          borderWidth="$1"
          borderColor="$borderColor"
          padding="$4"
        >
          <Text fontSize="$8" fontWeight="bold" textAlign="center">
            Login
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
              onPress={onClose}
              disabled={loading}
              backgroundColor="$gray8"
              color="white"
            >
              Back
            </Button>

            <Form.Trigger asChild disabled={loading}>
              <Button
                borderWidth="$1"
                borderColor="$borderColor"
                flex={1}
                size="$5"
                backgroundColor="white"
                color="$gray12"
                icon={loading ? () => <Spinner /> : undefined}
              >
                Submit
              </Button>
            </Form.Trigger>
          </XStack>
        </Form>
      </View>
    </SafeAreaView>
  );
};

export default SignInOrganism;