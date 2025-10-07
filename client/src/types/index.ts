interface User {
  id: string;
  name: string;
  email: string;
}

interface GitHubUser {
  username: string;
  avatar: string;
  bio: string;
  url: string;
  followersCount: number;
  followingCount: number;
  name: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  isPrivate: boolean;
  description: string | null;
  url: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalRepos: number;
}

interface GitHubResponse {
  user: GitHubUser;
  repos: GitHubRepo[];
  pagination: Pagination;
}

export type { User, GitHubUser, GitHubRepo, Pagination, GitHubResponse };
