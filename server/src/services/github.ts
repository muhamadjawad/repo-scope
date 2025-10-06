import { GitHubRepository, GitHubUser, isGitHubApiResponse, isGitHubRepoApiResponse } from '../types/github';

const GITHUB_BASE_URL = process.env.GITHUB_BASE_URL || 'https://api.github.com';

function transformUserData(userData: any): GitHubUser {
  if (!isGitHubApiResponse(userData)) {
    throw new Error('Invalid user data received from GitHub');
  }

  return {
    username: userData.login,
    avatar: userData.avatar_url,
    bio: userData.bio,
    url: userData.html_url,
    followersCount: userData.followers,
    followingCount: userData.following,
    name: userData.name
  };
}

function transformRepoData(repoData: any): GitHubRepository {
  if (!isGitHubRepoApiResponse(repoData)) {
    throw new Error('Invalid repository data received from GitHub');
  }

  return {
    id: repoData.id,
    name: repoData.name,
    isPrivate: repoData.private,
    description: repoData.description,
    url: repoData.html_url
  };
}

export async function fetchGitHubData(username: string): Promise<{ user: GitHubUser; repos: GitHubRepository[] }> {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`${GITHUB_BASE_URL}/users/${username}`),
      fetch(`${GITHUB_BASE_URL}/users/${username}/repos`)
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error('GitHub user not found');
    }

    const [userData, reposData] = await Promise.all([
      userResponse.json(),
      reposResponse.json()
    ]);

    const user = transformUserData(userData);
    const repos = Array.isArray(reposData) ? reposData.map(transformRepoData) : [];

    return { user, repos };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch GitHub data');
  }
}
