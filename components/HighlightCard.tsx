import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LocalizedText } from '~/components/LocalizedText';
import { useTheme } from '~/hooks/useTheme';

type HighlightCardProps = {
  icon: string;
  titleKey: string;
  subtitle: string;
  onPress: () => void;
};

const HighlightCard: React.FC<HighlightCardProps> = ({ icon, titleKey, subtitle, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <FontAwesome5 name={icon} size={24} color={colors.primary} />
      <View style={styles.textContainer}>
        <LocalizedText style={styles.title} translationKey={titleKey} />
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    width: '48%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 8,
  },
  textContainer: {
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
  },
});

export default HighlightCard; 