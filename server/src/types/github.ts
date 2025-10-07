interface GitHubApiResponse {
  // Full response types from GitHub API
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
}

interface GitHubRepoApiResponse {
  id: number;
  name: string;
  private: boolean;
  description: string | null;
  html_url: string;
  owner: any; // We'll ignore this in our response
}

// Our cleaned up types for response
export interface GitHubUser {
  username: string;
  avatar: string;
  bio: string | null;
  url: string;
  followersCount: number;
  followingCount: number;
  name: string | null;
}

export interface GitHubRepository {
  id: number;
  name: string;
  isPrivate: boolean;
  description: string | null;
  url: string;
}

export interface Pagination {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalRepos: number;
}

// Type guards for API responses
export function isGitHubApiResponse(data: any): data is GitHubApiResponse {
  return 'login' in data && 'avatar_url' in data;
}

export function isGitHubRepoApiResponse(data: any): data is GitHubRepoApiResponse {
  return 'id' in data && 'name' in data && 'html_url' in data;
}
