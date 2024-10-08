import {
  Card,
  Text,
  XStack,
  YStack,
  CardProps,
  Progress,
  Spinner,
} from "tamagui";
import { useTransaction } from "@/context/transactionContext";

export function TransactionFetchCard({ ...props }: CardProps) {
  const { receivedTransactionCount, demandedReceiptCount } = useTransaction();
  const progress = receivedTransactionCount / demandedReceiptCount;

  return (
    <Card
      borderRadius="$10"
      backgroundColor="$dark5"
      borderWidth="$1"
      borderColor="$borderColor"
      elevate
      size="$4"
      padding="$4"
      {...props}
    >
      <YStack gap="$1.5">
        <XStack
          justifyContent="space-between"
          alignItems="center"
          marginBottom="$2"
        >
          <Text fontSize="$4" fontWeight="bold">
            Receipts are processing...
          </Text>
          <Spinner size="small" />
        </XStack>
        <YStack gap="$1">
          <Progress value={progress * 100} height="$0.75">
            <Progress.Indicator animation="bouncy" />
          </Progress>
          <Text fontSize="$2" color="$gray11" marginTop="$2">
            {receivedTransactionCount} / {demandedReceiptCount} receipts
            processed
          </Text>
        </YStack>
      </YStack>
    </Card>
  );
}
