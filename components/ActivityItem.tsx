import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

type ActivityItemProps = {
  text: string; // Activity description
};

const ActivityItem: React.FC<ActivityItemProps> = ({ text }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.item, { backgroundColor: colors.card }]}>
      <Text style={[styles.text, { color: colors.text }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  text: {
    fontSize: 14,
  },
});

export default ActivityItem; 