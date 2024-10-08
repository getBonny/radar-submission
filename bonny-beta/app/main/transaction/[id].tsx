import { Image, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, ScrollView, Spinner, Text, YStack } from 'tamagui';
import React from 'react';
import ReceiptOrganism from '@/components/organisms/transaction/ReceiptOrganism';
import { TRANSACTION_TYPE, TransactionType } from '@/src/types/schema/transaction';
import { getTransaction } from '@/services/api/transactions';

export default function TransactionScreen() {
    const { id, type, typeid } = useLocalSearchParams();

    const [transaction, setTransaction] = React.useState<TransactionType | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const transaction = await getTransaction(id as string);
                setTransaction(transaction);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchTransaction();
        }
    }, [id]);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }
    return (
        <SafeAreaView>
            {type === TRANSACTION_TYPE.RECEIPT_UPLOAD && id && transaction && (
                <ReceiptOrganism receiptId={typeid as string} transaction={transaction} />
            )}
            {type === TRANSACTION_TYPE.REFERRAL_BONUS && id && (
                <Text>Payment Details for ID: {id}</Text>
            )}
            {type === TRANSACTION_TYPE.COUPON && id && (
                <Text>Refund Details for ID: {id}</Text>
            )}
        </SafeAreaView>
    );
}