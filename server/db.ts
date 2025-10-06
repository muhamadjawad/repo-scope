import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { User } from './src/types/auth';

interface DbSchema {
    users: User[];
}

const adapter = new JSONFile<DbSchema>('db.json');
const defaultData: DbSchema = { users: [] };
export const db = new Low<DbSchema>(adapter, defaultData);

export async function initializeDb() {
    await db.read();
    if (db.data === null) {
        db.data = defaultData;
        await db.write();
    }
}

initializeDb().catch(console.error);
