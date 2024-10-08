import { useAuth } from "@/context/authContext";
import { TransactionProvider } from "@/context/transactionContext";
import { UserProvider } from "@/context/userContext";
import { Slot, Stack, useRouter } from "expo-router";

export default function MainLayout() {
  const { session } = useAuth();
  const router = useRouter();

  if (!session) {
    router.push("/");
  }

  return (
    <UserProvider>
      <TransactionProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ title: "Home", headerShown: false }}
          />
          <Stack.Screen
            name="transaction/[id]"
            options={{ title: "Transaction", headerShown: true }}
          />
          <Stack.Screen
            name="level/index"
            options={{ title: "Level", headerShown: true }}
          />
        </Stack>
      </TransactionProvider>
    </UserProvider>
  );
}
