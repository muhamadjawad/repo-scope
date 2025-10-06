import { db } from '../../db';
import { User } from '../types/auth';
import { v4 as uuidv4 } from 'uuid';

export async function createUser(name: string, email: string, password: string): Promise<User> {
  if (!db.data) throw new Error('Database not initialized');

  const existingUser = db.data.users.find(user => user.email === email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser: User = {
    id: uuidv4(),
    name,
    email,
    password
  };

  db.data.users.push(newUser);
  await db.write();
  return newUser;
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  if (!db.data) throw new Error('Database not initialized');
  return db.data.users.find(user => user.email === email);
}

export async function findUserById(id: string): Promise<User | undefined> {
  if (!db.data) throw new Error('Database not initialized');
  return db.data.users.find(user => user.id === id);
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User> {
  if (!db.data) throw new Error('Database not initialized');
  
  const userIndex = db.data.users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    throw new Error('User not found');
  }

  db.data.users[userIndex] = {
    ...db.data.users[userIndex],
    ...updates
  };

  await db.write();
  return db.data.users[userIndex];
}
