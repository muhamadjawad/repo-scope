import { useState, useEffect, useCallback } from 'react';
import api from '@/services/api';
import type { GitHubResponse } from '@/types';

export const useHome = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [githubData, setGithubData] = useState<GitHubResponse | null>(null);

  const handleSearch = useCallback(async () => {
    if (!username.trim()) return;

    setIsLoading(true);
    setError(null);
    setGithubData(null);

    try {
      const response = await api.get(`/github/user-repos/?username=${username}&page=1`);
      setGithubData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch GitHub data');
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  const loadMoreRepos = useCallback(async () => {
    if (!githubData || isFetchingMore || githubData.pagination.currentPage >= githubData.pagination.totalPages) {
      return;
    }

    setIsFetchingMore(true);
    const nextPage = githubData.pagination.currentPage + 1;

    try {
      const response = await api.get(`/github/user-repos/?username=${username}&page=${nextPage}`);
      setGithubData(prevData => ({
        ...prevData!,
        repos: [...prevData!.repos, ...response.data.repos],
        pagination: response.data.pagination,
      }));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch more repositories');
    } finally {
      setIsFetchingMore(false);
    }
  }, [githubData, isFetchingMore, username]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        loadMoreRepos();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreRepos]);

  return {
    username,
    setUsername,
    isLoading,
    isFetchingMore,
    error,
    githubData,
    handleSearch,
  };
};
