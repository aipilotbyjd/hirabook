import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '~/hooks/useTheme';
import { AudioGuide } from '~/components/AudioGuide';
import audioGuide from '~/assets/audio/add_work_entry.mp3'; // Ensure this file exists
import { ConfirmationMessage } from '~/components/ConfirmationMessage';
import { LocalizedText } from '~/components/LocalizedText';

export default function AddWorkEntry() {
  const { colors } = useTheme();
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [workType, setWorkType] = useState('');
  const [hours, setHours] = useState('');
  const [earnings, setEarnings] = useState('');
  const [notes, setNotes] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSave = () => {
    if (!workType || !hours || !earnings) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    // Implement saving logic here (e.g., API call or local DB)
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      router.back();
    }, 2500);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Add Work Entry' }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Date Picker */}
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Date</Text>
          <Text style={[styles.inputText, { color: colors.text }]}>{date.toDateString()}</Text>
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

        {/* Work Type */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Work Type *</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.separator, color: colors.text }]}
            placeholder="e.g., Polishing"
            placeholderTextColor={colors.separator}
            value={workType}
            onChangeText={setWorkType}
          />
        </View>

        {/* Hours Worked */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Hours Worked *</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.separator, color: colors.text }]}
            placeholder="e.g., 8"
            placeholderTextColor={colors.separator}
            keyboardType="numeric"
            value={hours}
            onChangeText={setHours}
          />
        </View>

        {/* Earnings */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Earnings (₹) *</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.separator, color: colors.text }]}
            placeholder="e.g., 500"
            placeholderTextColor={colors.separator}
            keyboardType="numeric"
            value={earnings}
            onChangeText={setEarnings}
          />
        </View>

        {/* Notes */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Notes</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              { borderColor: colors.separator, color: colors.text },
            ]}
            placeholder="Optional notes"
            placeholderTextColor={colors.separator}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Audio Guidance */}
        <AudioGuide audioFile={audioGuide} label="Play Audio Guidance" />

        {/* Confirmation Message */}
        <ConfirmationMessage message="Your work entry has been saved!" visible={showConfirmation} />

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <LocalizedText style={styles.saveButtonText} translationKey="save" />
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
  textArea: 'h-24 text-sm',
  saveButton: 'bg-green-500 p-4 rounded-lg',
  saveButtonText: 'text-white text-center font-semibold',
};
