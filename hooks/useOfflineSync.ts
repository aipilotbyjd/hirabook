import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { getUnsyncedWorkEntries, markWorkEntryAsSynced } from '~/services/database';
import { firebaseDB } from '~/firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export const useOfflineSync = () => {
  const syncWorkEntries = async () => {
    try {
      const unsyncedEntries = await getUnsyncedWorkEntries();
      if (unsyncedEntries.length === 0) {
        console.log('No unsynced work entries found.');
        return;
      }

      for (const entry of unsyncedEntries) {
        try {
          await addDoc(collection(firebaseDB, 'work_entries'), {
            date: entry.date,
            type: entry.type,
            hours: entry.hours,
            earnings: entry.earnings,
            notes: entry.notes,
          });
          await markWorkEntryAsSynced(entry.id);
          console.log(`Work entry ${entry.id} synced successfully.`);
        } catch (error) {
          console.error(`Failed to sync work entry ${entry.id}:`, error);
        }
      }
    } catch (error) {
      console.error('Error fetching unsynced work entries:', error);
    }
  };

  const syncPayments = async () => {
    try {
      const unsyncedPayments = await getUnsyncedPayments();
      if (unsyncedPayments.length === 0) {
        console.log('No unsynced payments found.');
        return;
      }

      for (const payment of unsyncedPayments) {
        try {
          await addDoc(collection(firebaseDB, 'payments'), {
            date: payment.date,
            amount: payment.amount,
            source: payment.source,
            remarks: payment.remarks,
            status: payment.status,
          });
          await markPaymentAsSynced(payment.id);
          console.log(`Payment ${payment.id} synced successfully.`);
        } catch (error) {
          console.error(`Failed to sync payment ${payment.id}:`, error);
        }
      }
    } catch (error) {
      console.error('Error fetching unsynced payments:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        syncWorkEntries();
        syncPayments();
        // Add other sync functions as needed
      }
    });

    return () => unsubscribe();
  }, []);
};