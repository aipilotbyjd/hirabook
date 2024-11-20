import { Stack } from 'expo-router';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '~/hooks/useTheme';
import { useRouter } from 'expo-router';

export default function WorkEntry() {
  const { colors } = useTheme();
  const router = useRouter();

  const mockWorkEntries = [
    {
      id: '1',
      date: '15 Nov',
      type: 'Polishing',
      hours: 8,
      earnings: 500,
      notes: 'Special stone.',
    },
    {
      id: '2',
      date: '14 Nov',
      type: 'Cutting',
      hours: 6,
      earnings: 350,
      notes: '',
    },
    // Add more entries as needed
  ];

  return (
    <>
      <Stack.Screen options={{ title: 'Work Entry' }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/work-entry/add')}>
          <Text style={styles.addButtonText}>+ Add Work Entry</Text>
        </TouchableOpacity>

        <FlatList
          data={mockWorkEntries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <WorkEntryItem entry={item} />}
          ListHeaderComponent={<Text style={styles.listHeader}>Work History</Text>}
        />
      </View>
    </>
  );
}

const WorkEntryItem = ({ entry }) => {
  const { colors } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    router.push(`/work-entry/edit/${entry.id}`);
  };

  return (
    <TouchableOpacity
      style={[styles.entryItem, { backgroundColor: colors.card }]}
      onPress={handlePress}>
      <View style={styles.entryRow}>
        <Text style={[styles.entryDate, { color: colors.text }]}>{entry.date}</Text>
        <Text style={[styles.entryType, { color: colors.text }]}>{entry.type}</Text>
      </View>
      <View style={styles.entryRow}>
        <Text style={[styles.entryHours, { color: colors.text }]}>
          {entry.hours} hrs
        </Text>
        <Text style={[styles.entryEarnings, { color: colors.text }]}>
          ₹{entry.earnings}
        </Text>
      </View>
      {entry.notes ? (
        <Text style={[styles.entryNotes, { color: colors.text }]}>{entry.notes}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = {
  container: 'flex-1 p-4',
  addButton: 'bg-green-500 p-4 rounded-lg mb-4',
  addButtonText: 'text-white text-center font-semibold',
  listHeader: 'text-lg font-bold mb-2',
  entryItem: 'p-4 rounded-lg shadow mb-3',
  entryRow: 'flex-row justify-between mb-1',
  entryDate: 'text-sm',
  entryType: 'text-sm font-semibold',
  entryHours: 'text-sm',
  entryEarnings: 'text-sm font-bold',
  entryNotes: 'text-xs text-gray-500',
};
