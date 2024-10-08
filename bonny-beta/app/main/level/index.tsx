import { Image, StyleSheet, Platform, SafeAreaView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, ScrollView, Spinner, Text, YStack } from "tamagui";
import React from "react";
import ReceiptOrganism from "@/components/organisms/transaction/ReceiptOrganism";
import {
  TRANSACTION_TYPE,
  TransactionType,
} from "@/src/types/schema/transaction";
import { getTransaction } from "@/services/api/transactions";
import { LevelType } from "@/src/types/schema/levels";
import { getLevels } from "@/services/api/level";
import LevelDescrOrganism from "@/components/organisms/level/LevelDescrOrganism";
import { useUser } from "@/context/userContext";

export default function LevelScreen() {
  const [levels, setLevels] = React.useState<LevelType[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { user } = useUser();

  React.useEffect(() => {
    const fetchLevels = async () => {
      try {
        const levels = await getLevels();
        levels.sort((a, b) => a.id - b.id);
        setLevels(levels);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView>
      <LevelDescrOrganism levels={levels} userTokens={user?.tokens ?? 0} />
    </SafeAreaView>
  );
}
