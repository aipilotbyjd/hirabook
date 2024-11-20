import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const usePushNotifications = () => {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync();

    // Listener for incoming notifications while app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    // Listener for user interactions with notifications
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
    });

    // Schedule daily notifications
    scheduleDailyNotifications();

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push notification permissions!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Push Notification Token:', token);
    // Optionally, send the token to your backend server
  };

  const scheduleDailyNotifications = async () => {
    // Cancel existing notifications to prevent duplicates
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Schedule a notification every day at 8 PM
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hirabook Reminder',
        body: 'Don\'t forget to log your work or payments today!',
      },
      trigger: {
        hour: 20,
        minute: 0,
        repeats: true,
      },
    });
  };
};