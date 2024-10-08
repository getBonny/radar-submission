import { UserType } from "@/src/types/schema/user";
import { ScrollView, Text, View, YStack } from "tamagui";
import { SafeAreaView } from "react-native";
import { TokenCard } from "@/components/molecules/cards/TokenCard";
import { LevelCard } from "@/components/molecules/cards/LevelCard";
import { LevelType } from "@/src/types/schema/levels";
import { TransactionType } from "@/src/types";
import { TransactionCard } from "@/components/molecules/cards/TransactionCard";
import { TransactionFetchCard } from "@/components/molecules/cards/TransactionFetchCard";
import { useTransaction } from "@/context/transactionContext";
import { useUser } from "@/context/userContext";

const user: UserType = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  email: "johndoe@example.com",
  tokens: 3201.32,
  userName: "johndoe",
  profileUrl: "https://i.pravatar.cc/300",
  supporterStatus: "active",
  createdOn: new Date(),
  updatedOn: new Date(),
  createdBy: "", // Add this
  updatedBy: "", // Add this
};

const level: LevelType = {
  id: 1,
  title: "Level 1",
  description: "Description of level 1",
  totalTokens: 1350.32,
};

export default function HomeScreen() {
  const { isListening, transactions } = useTransaction();
  const { user } = useUser();

  return (
    <SafeAreaView>
      <ScrollView padding="$4" height="100%">
        <YStack gap="$4" paddingBottom="$8">
          <TokenCard tokens={user?.tokens ?? 0} />
          <LevelCard level={level} />

          <Text fontSize="$8" fontWeight="semibold">
            Transactions
          </Text>

          <YStack gap="$2">
            {isListening && <TransactionFetchCard />}

            {transactions.map((transaction) => (
              <TransactionCard
                onPress={() => {}}
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

/*

<ParallaxScrollView title="Welcome back, John!">
      <CardOrganism user={user} />
    </ParallaxScrollView>

    */
