import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './localization/i18n';
import RootLayout from './app/_layout';
import { initializeDatabase } from './services/database';
import { useOfflineSync } from './hooks/useOfflineSync';
import { usePushNotifications } from './hooks/usePushNotifications';

export default function App() {
  useEffect(() => {
    initializeDatabase();
  }, []);

  useOfflineSync(); // Initialize offline sync
  usePushNotifications(); // Initialize push notifications

  return (
    <I18nextProvider i18n={i18n}>
      <RootLayout />
    </I18nextProvider>
  );
} 