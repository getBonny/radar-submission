import { Card, H3, Text, XStack, CardProps, Circle } from "tamagui";
import { TransactionType, TxReceiptTypeInfo } from "../../../src/types/schema/transaction";
import { TouchableOpacity } from "react-native";
import { ArrowUp, ChevronRight } from "@tamagui/lucide-icons";
import { getTransactionTitle, mapTransactionType } from "@/lib/helper/transactionMapper";
import { Link } from "expo-router";

export function TransactionCard({
  transaction,
  onPress,
  ...props
}: { transaction: TransactionType; onPress: () => void } & CardProps) {

    const transactionType = mapTransactionType(transaction.type);
    const transactionTitle = transactionType ? getTransactionTitle(transactionType) : transaction.type;
    const transactionTypeInfo = transaction.typeInfo as TxReceiptTypeInfo;
    const typeId = transactionTypeInfo?.receipt_id;

  return (
    <Link
      href={{
        pathname: "/main/transaction/[id]",
        params: { id: transaction.id, type: transaction.type, typeid: typeId },
      }}
      asChild
    >
      <Card
        borderRadius="$10"
        backgroundColor="$dark5"
        borderWidth="$1"
        borderColor="$borderColor"
        elevate
        size="$4"
        onPress={onPress}
        {...props}
      >
        <XStack padding="$4" alignItems="center" justifyContent="space-between">
          <XStack gap="$3" alignItems="center">
            <Circle size={40} backgroundColor="$green3">
              <ArrowUp size={24} color="$green10" />
            </Circle>
            <XStack flexDirection="column">
              <H3>{transactionTitle}</H3>
              <Text fontSize="$2" color="$gray11">
                {new Date(transaction.createdOn).toLocaleDateString()}
              </Text>
            </XStack>
          </XStack>
          <XStack alignItems="center" gap="$2">
            <Text fontSize="$4" fontWeight="bold" color="$green10">
              {transaction.tokens} °B
            </Text>
            <ChevronRight size={24} color="$color" />
          </XStack>
        </XStack>
      </Card>
      </Link>
  );
}
