import { Request, Response } from 'express';
import * as githubService from '../services/github';

export async function getGitHubData(req: Request, res: Response) {
    try {
        const { username } = req.query;

        if (!username || typeof username !== 'string') {
            return res.status(400).json({ error: 'GitHub username is required' });
        }

        const data = await githubService.fetchGitHubData(username);
        res.json(data);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
