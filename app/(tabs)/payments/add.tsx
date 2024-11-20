import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Picker } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '~/hooks/useTheme';

export default function AddPayment() {
  const { colors } = useTheme();
  const router = useRouter();

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('Cash');
  const [remarks, setRemarks] = useState('');

  const handleSave = () => {
    if (!amount || !source) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    // Save the payment entry (implement API call or state update here)
    Alert.alert('Success', 'Payment has been recorded.');
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Add Payment' }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Date Picker */}
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Date</Text>
          <Text style={[styles.inputText, { color: colors.text }]}>
            {date.toDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        {/* Amount Received */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Amount Received (₹) *</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.separator, color: colors.text }]}
            placeholder="e.g., 500"
            placeholderTextColor={colors.separator}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        {/* Payment Source */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Payment Source *</Text>
          <Picker
            selectedValue={source}
            style={[styles.picker, { color: colors.text }]}
            onValueChange={(itemValue) => setSource(itemValue)}>
            <Picker.Item label="Cash" value="Cash" />
            <Picker.Item label="Bank Transfer" value="Bank Transfer" />
            <Picker.Item label="Online Payment" value="Online Payment" />
          </Picker>
        </View>

        {/* Remarks */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Remarks</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              { borderColor: colors.separator, color: colors.text },
            ]}
            placeholder="Optional remarks"
            placeholderTextColor={colors.separator}
            value={remarks}
            onChangeText={setRemarks}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Payment</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = {
  container: 'flex-1 p-4',
  inputGroup: 'mb-4',
  label: 'mb-1 font-semibold',
  input: 'border p-2 rounded',
  inputText: 'p-2',
  picker: 'border p-2 rounded',
  textArea: 'height-24 text-sm',
  saveButton: 'bg-green-500 p-4 rounded-lg',
  saveButtonText: 'text-white text-center font-semibold',
};
