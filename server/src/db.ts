import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { User } from './types/auth';

interface DbSchema {
    users: User[];
}

const adapter = new JSONFile<DbSchema>('db.json');
const defaultData: DbSchema = { users: [] };
const db = new Low<DbSchema>(adapter, defaultData);

const initializeDb = async (): Promise<void> => {
    try {
        await db.read();
        db.data ||= defaultData;
        await db.write();
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Database initialization error:', error);
        throw error;
    }
};

export { db };
export default initializeDb;
