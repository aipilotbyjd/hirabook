import { Stack } from 'expo-router';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '~/hooks/useTheme';
import { useRouter } from 'expo-router';

export default function Payments() {
  const { colors } = useTheme();
  const router = useRouter();

  const mockPayments = [
    {
      id: '1',
      date: '15 Nov',
      amount: 500,
      source: 'Bank Transfer',
      remarks: 'Advance for next week.',
      status: 'Paid',
    },
    {
      id: '2',
      date: '14 Nov',
      amount: 300,
      source: 'Cash',
      remarks: '',
      status: 'Unpaid',
    },
    // Add more payments as needed
  ];

  return (
    <>
      <Stack.Screen options={{ title: 'Payments' }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/payments/add')}>
          <Text style={styles.addButtonText}>+ Add Payment</Text>
        </TouchableOpacity>

        <FlatList
          data={mockPayments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PaymentItem payment={item} />}
          ListHeaderComponent={<Text style={styles.listHeader}>Payment History</Text>}
        />
      </View>
    </>
  );
}

const PaymentItem = ({ payment }) => {
  const { colors } = useTheme();
  const router = useRouter();

  const handleMarkAsPaid = () => {
    Alert.alert(
      'Confirm',
      `Mark ₹${payment.amount} as paid?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            // Implement mark as paid functionality
            Alert.alert('Success', 'Payment marked as paid.');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={[styles.paymentItem, { backgroundColor: colors.card }]}>
      <View style={styles.paymentRow}>
        <Text style={[styles.paymentDate, { color: colors.text }]}>{payment.date}</Text>
        <Text style={[styles.paymentAmount, { color: colors.text }]}>₹{payment.amount}</Text>
      </View>
      <View style={styles.paymentRow}>
        <Text style={[styles.paymentSource, { color: colors.text }]}>{payment.source}</Text>
        <Text style={[styles.paymentStatus, { color: payment.status === 'Paid' ? colors.success : colors.error }]}>
          {payment.status}
        </Text>
      </View>
      {payment.remarks ? (
        <Text style={[styles.paymentRemarks, { color: colors.text }]}>{payment.remarks}</Text>
      ) : null}
      {payment.status === 'Unpaid' && (
        <TouchableOpacity style={styles.markAsPaidButton} onPress={handleMarkAsPaid}>
          <Text style={styles.markAsPaidText}>Mark as Paid</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = {
  container: 'flex-1 p-4',
  addButton: 'bg-green-500 p-4 rounded-lg mb-4',
  addButtonText: 'text-white text-center font-semibold',
  listHeader: 'text-lg font-bold mb-2',
  paymentItem: 'p-4 rounded-lg shadow mb-3',
  paymentRow: 'flex-row justify-between mb-1',
  paymentDate: 'text-sm',
  paymentAmount: 'text-sm font-bold',
  paymentSource: 'text-sm',
  paymentStatus: 'text-sm font-semibold',
  paymentRemarks: 'text-xs text-gray-500',
  markAsPaidButton: 'mt-2 bg-blue-500 p-2 rounded',
  markAsPaidText: 'text-white text-center text-sm',
};
