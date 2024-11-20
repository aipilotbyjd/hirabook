import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '~/hooks/useTheme';
import { LocalizedText } from '~/components/LocalizedText';
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
          <LocalizedText style={[styles.greeting, { color: colors.text }]} translationKey="greeting" values={{ name: 'Ramesh' }} />
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
          <LocalizedText style={[styles.sectionTitle, { color: colors.text }]} translationKey="recent_activities" />
          <ActivityItem text="Logged 8 hours for polishing." />
          <ActivityItem text="Received ₹500 payment." />
          <ActivityItem text="Marked ₹300 as received." />
        </View>

        {/* Confirmation Message */}
        <ConfirmationMessage message="Action completed successfully!" visible={showConfirmation} />
      </View>
    </>
  );
}

const HighlightCard = ({ icon, titleKey, subtitle, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <FontAwesome5 name={icon} size={24} color="#FF7043" />
    <View style={styles.cardText}>
      <LocalizedText style={styles.cardTitle} translationKey={titleKey} />
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

const ShortcutButton = ({ icon, labelKey, onPress }) => (
  <TouchableOpacity style={styles.shortcutButton} onPress={onPress}>
    <FontAwesome5 name={icon} size={24} color="#FFFFFF" />
    <LocalizedText style={styles.shortcutLabel} translationKey={labelKey} />
  </TouchableOpacity>
);

const ActivityItem = ({ text }) => (
  <View style={styles.activityItem}>
    <Text style={styles.activityText}>{text}</Text>
  </View>
);

const styles = {
  container: 'flex-1 p-4',
  header: 'flex-row justify-between items-center mb-4',
  greeting: 'text-xl font-semibold',
  highlights: 'flex-row justify-between mb-4',
  card: 'flex-row items-center bg-white p-4 rounded-lg shadow',
  cardText: 'ml-4',
  cardTitle: 'text-lg font-bold',
  cardSubtitle: 'text-sm text-gray-500',
  shortcuts: 'flex-row justify-around mb-4',
  shortcutButton: 'items-center bg-indigo-500 p-4 rounded-lg',
  shortcutLabel: 'mt-2 text-white text-sm',
  activities: 'flex-1',
  sectionTitle: 'text-lg font-bold mb-2',
  activityItem: 'bg-white p-3 rounded-lg shadow mb-2',
  activityText: 'text-sm',
};
