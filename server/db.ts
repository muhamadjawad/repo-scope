import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { User } from './src/types/auth';

interface DbSchema {
    users: User[];
}

// Create db.json file if it doesn't exist
const adapter = new JSONFile<DbSchema>('db.json');
const defaultData: DbSchema = { users: [] };
export const db = new Low<DbSchema>(adapter, defaultData);

// Initialize database
export async function initializeDb() {
    // Read data from JSON file, this will set db.data content
    await db.read();

    // If db.json doesn't exist, db.data will be null
    // Set default data if db.data is null
    if (db.data === null) {
        db.data = defaultData;
        await db.write();
    }
}

// Initialize the database
initializeDb().catch(console.error);
