import { Request, Response } from 'express';
import * as githubService from '../services/github';

export async function getGitHubData(req: Request, res: Response) {
    try {
        const { username, page, limit } = req.query;

        if (!username || typeof username !== 'string') {
            return res.status(400).json({ error: 'GitHub username is required' });
        }

        const pageNum = parseInt(page as string, 10) || 1;
        const limitNum = parseInt(limit as string, 10) || 10;

        const data = await githubService.fetchGitHubData(username, pageNum, limitNum);
        res.json(data);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
