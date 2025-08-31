import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

// Function to open the database
export async function openDB() {
  // Ensure database file path is absolute
  const dbFile = path.resolve('./database.db');

  // Open SQLite database
  return open({
    filename: dbFile,
    driver: sqlite3.Database
  });
}
