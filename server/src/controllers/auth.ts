import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { RegisterRequest, LoginRequest, UpdateProfileRequest } from '../types/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

import * as authModel from '../models/auth';

export async function register(req: Request<{}, {}, RegisterRequest>, res: Response) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await authModel.createUser(name, email, password);

    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({
      message: 'User registered successfully',
      user: userWithoutPassword
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export async function login(req: Request<{}, {}, LoginRequest>, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await authModel.findUserByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getProfile(req: Request, res: Response) {
  try {
    const userId = (req as any).userId; // Set by auth middleware
    const user = await authModel.findUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateProfile(req: Request<{}, {}, UpdateProfileRequest>, res: Response) {
  try {
    const userId = (req as any).userId; // Set by auth middleware
    const updates = req.body;

    const updatedUser = await authModel.updateUser(userId, updates);
    const { password: _, ...userWithoutPassword } = updatedUser;

    res.json(userWithoutPassword);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
