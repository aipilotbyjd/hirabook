import { Stack } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '~/hooks/useTheme';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

export default function LanguageSettings() {
  const { colors } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = ['English', 'Hindi', 'Gujarati'];

  return (
    <>
      <Stack.Screen options={{ title: 'Language Selection' }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang}
            style={styles.languageItem}
            onPress={() => setSelectedLanguage(lang)}>
            <Text style={[styles.languageText, { color: colors.text }]}>{lang}</Text>
            {selectedLanguage === lang && (
              <FontAwesome5 name="check" size={16} color={colors.primary} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const styles = {
  container: 'flex-1 p-4',
  languageItem: 'flex-row justify-between items-center p-3 rounded-lg mb-2',
  languageText: 'text-base',
};
