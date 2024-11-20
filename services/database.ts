import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('hirabook.db');

export const initializeDatabase = () => {
  db.transaction(tx => {
    // Create Work Entries table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS work_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        type TEXT,
        hours INTEGER,
        earnings INTEGER,
        notes TEXT,
        synced INTEGER DEFAULT 0
      );`,
      [],
      () => { console.log('Work entries table created successfully'); },
      (tx, error) => { console.log('Error creating work entries table:', error); }
    );

    // Create Payments table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        amount INTEGER,
        source TEXT,
        remarks TEXT,
        status TEXT,
        synced INTEGER DEFAULT 0
      );`,
      [],
      () => { console.log('Payments table created successfully'); },
      (tx, error) => { console.log('Error creating payments table:', error); }
    );

    // Add other tables as needed
  });
};

export const addWorkEntry = (entry) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO work_entries (date, type, hours, earnings, notes, synced) VALUES (?, ?, ?, ?, ?, ?);`,
        [entry.date, entry.type, entry.hours, entry.earnings, entry.notes, entry.synced ? 1 : 0],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const getUnsyncedWorkEntries = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM work_entries WHERE synced = 0;`,
        [],
        (_, { rows: { _array } }) => resolve(_array),
        (_, error) => reject(error)
      );
    });
  });
};

export const markWorkEntryAsSynced = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE work_entries SET synced = 1 WHERE id = ?;`,
        [id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

// Similarly, implement functions for payments and other data entities 