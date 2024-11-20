import { Stack, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, Image, Switch } from 'react-native';
import { useTheme } from '~/hooks/useTheme';
import { useState } from 'react';

export default function Account() {
  const { colors } = useTheme();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => setIsDarkMode((previousState) => !previousState);

  return (
    <>
      <Stack.Screen options={{ title: 'Account' }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Profile Section */}
        <View style={styles.profile}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>Ramesh Kumar</Text>
            <Text style={[styles.profileContact, { color: colors.text }]}>+91 98765 43210</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/account/edit')}>
            <FontAwesome5 name="edit" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Settings Section */}
        <View style={styles.settings}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>

          {/* Language Selection */}
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/account/settings/language')}>
            <Text style={[styles.settingText, { color: colors.text }]}>Language</Text>
            <FontAwesome5 name="chevron-right" size={16} color={colors.separator} />
          </TouchableOpacity>

          {/* Dark Mode */}
          <View style={styles.settingItem}>
            <Text style={[styles.settingText, { color: colors.text }]}>Dark Mode</Text>
            <Switch
              trackColor={{ false: colors.separator, true: colors.primary }}
              thumbColor={isDarkMode ? colors.primary : colors.separator}
              onValueChange={toggleSwitch}
              value={isDarkMode}
            />
          </View>

          {/* Reminders */}
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/account/settings/reminders')}>
            <Text style={[styles.settingText, { color: colors.text }]}>Reminders</Text>
            <FontAwesome5 name="chevron-right" size={16} color={colors.separator} />
          </TouchableOpacity>

          {/* Security */}
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/account/settings/security')}>
            <Text style={[styles.settingText, { color: colors.text }]}>Security</Text>
            <FontAwesome5 name="chevron-right" size={16} color={colors.separator} />
          </TouchableOpacity>
        </View>

        {/* Data Management */}
        <View style={styles.settings}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Data Management</Text>
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/account/data/backup')}>
            <Text style={[styles.settingText, { color: colors.text }]}>Backup & Sync</Text>
            <FontAwesome5 name="chevron-right" size={16} color={colors.separator} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/account/data/restore')}>
            <Text style={[styles.settingText, { color: colors.text }]}>Restore Data</Text>
            <FontAwesome5 name="chevron-right" size={16} color={colors.separator} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/account/data/export-import')}>
            <Text style={[styles.settingText, { color: colors.text }]}>Export/Import Data</Text>
            <FontAwesome5 name="chevron-right" size={16} color={colors.separator} />
          </TouchableOpacity>
        </View>

        {/* Support & Feedback */}
        <View style={styles.settings}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Support & Feedback</Text>
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/account/support/faq')}>
            <Text style={[styles.settingText, { color: colors.text }]}>FAQ</Text>
            <FontAwesome5 name="chevron-right" size={16} color={colors.separator} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/account/support/contact')}>
            <Text style={[styles.settingText, { color: colors.text }]}>Contact Support</Text>
            <FontAwesome5 name="chevron-right" size={16} color={colors.separator} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/account/support/feedback')}>
            <Text style={[styles.settingText, { color: colors.text }]}>Feedback</Text>
            <FontAwesome5 name="chevron-right" size={16} color={colors.separator} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = {
  container: 'flex-1 p-4',
  profile: 'flex-row items-center mb-6',
  profileImage: 'w-20 h-20 rounded-full',
  profileInfo: 'flex-1 ml-4',
  profileName: 'text-lg font-bold',
  profileContact: 'text-sm text-gray-500',
  settings: 'mb-6',
  sectionTitle: 'text-lg font-bold mb-2',
  settingItem: 'flex-row justify-between items-center p-2 rounded-lg mb-2',
  settingText: 'text-base',
  switch: 'mt-1',
};
