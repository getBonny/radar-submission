import React, { useEffect, useState } from "react";
import {
  YStack,
  Text,
  Spinner,
  Card,
  H2,
  Paragraph,
  XStack,
  H4,
  Image,
  ScrollView,
} from "tamagui";
import { getReceipt } from "@/services/api/receipt";
import { ReceiptType, TransactionType } from "@/src/types";
import { supabase } from "@/lib/supabase";

interface ReceiptOrganismProps {
  receiptId: string;
  transaction: TransactionType;
}

const ReceiptOrganism: React.FC<ReceiptOrganismProps> = ({
  receiptId,
  transaction,
}) => {
  const [receipt, setReceipt] = useState<ReceiptType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const receipt = await getReceipt(receiptId);
        setReceipt(receipt);
        console.log(receipt);
        if (receipt?.storageUrl) {
          fetchImage(receipt.storageUrl);
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipt();
  }, [receiptId, transaction]);

  const fetchImage = async (path: string) => {
    try {
      const { data } = supabase.storage.from('receipts').getPublicUrl(path);
      if (error) {
        throw error;
      }
      setImageUrl(data.publicUrl);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  return (
    <ScrollView padding="$4" height="100%">
      <YStack gap="$4">
        <Card
          borderRadius="$10"
          backgroundColor="$dark5"
          borderWidth="$1"
          borderColor="$borderColor"
          elevate
          size="$4"
        >
          <Card.Header padded>
            <H2>Receipt Details</H2>
            <Paragraph theme="alt2">at {receipt?.supplierName}</Paragraph>
          </Card.Header>

          <Card.Footer padded>
            <XStack flex={1} />
            <Card
              borderRadius="$5"
              backgroundColor="$green8"
              borderWidth="$1"
              borderColor="$borderColor"
              paddingHorizontal="$4"
              paddingVertical="$2"
              elevate
              size="$4"
            >
              <H4 color="$white" fontWeight="semibold">
                + {transaction.tokens} °B
              </H4>
            </Card>
          </Card.Footer>
        </Card>

        <Card>
          <Image
            source={{
              width: 200,
              height: 200,
              uri: imageUrl || undefined,
            }}
            width="100%"
            height="100%"
          />
          {imageUrl ? null : <Text>No image available</Text>}
        </Card>
      </YStack>
    </ScrollView>
  );
};

export default ReceiptOrganism;
