import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { useTheme } from '~/hooks/useTheme';
import { LocalizedText } from '~/components/LocalizedText';
import HighlightCard from '~/components/HighlightCard';
import ShortcutButton from '~/components/ShortcutButton';
import ActivityItem from '~/components/ActivityItem';
import { ConfirmationMessage } from '~/components/ConfirmationMessage';

export default function Home() {
  const { colors } = useTheme();
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAction = () => {
    // Implement action logic here
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      // Navigate or perform other actions
    }, 2500);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header Section */}
        <View style={styles.header}>
          <LocalizedText
            style={[styles.greeting, { color: colors.text }]}
            translationKey="greeting"
            values={{ name: 'Ramesh' }}
          />
          <TouchableOpacity onPress={() => router.push('/account')}>
            <FontAwesome5 name="user-circle" size={30} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Today’s Highlights */}
        <View style={styles.highlights}>
          <HighlightCard
            icon="clock"
            titleKey="today_summary"
            subtitle="₹500 earned."
            onPress={() => router.push('/work-entry')}
          />
          <HighlightCard
            icon="money-bill-wave"
            titleKey="pending_payments"
            subtitle="₹1,200 still pending."
            onPress={() => router.push('/payments')}
          />
        </View>

        {/* Shortcuts */}
        <View style={styles.shortcuts}>
          <ShortcutButton
            icon="edit"
            labelKey="log_work"
            onPress={() => router.push('/work-entry/add')}
          />
          <ShortcutButton
            icon="plus-square"
            labelKey="add_payment"
            onPress={() => router.push('/payments/add')}
          />
        </View>

        {/* Recent Activities */}
        <View style={styles.activities}>
          <LocalizedText
            style={[styles.sectionTitle, { color: colors.text }]}
            translationKey="recent_activities"
          />
          <ActivityItem text="Logged 8 hours for polishing." />
          <ActivityItem text="Received ₹500 payment." />
          <ActivityItem text="Marked ₹300 as received." />
        </View>

        {/* Confirmation Message */}
        <ConfirmationMessage
          message="Action completed successfully!"
          visible={showConfirmation}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  highlights: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  shortcuts: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  activities: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
