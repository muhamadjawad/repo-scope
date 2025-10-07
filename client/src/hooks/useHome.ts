import { useState, useEffect, useCallback, useRef } from 'react';
import api from '@/services/api';
import type { GitHubResponse } from '@/types';

const CACHE_EXPIRATION_MS = 60 * 60 * 1000; // 1 hour

interface CachedData {
  data: GitHubResponse;
  timestamp: number;
}

export const useHome = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [githubData, setGithubData] = useState<GitHubResponse | null>(null);
  
  // A ref to prevent duplicate pagination calls from rapid scroll events
  const isFetchingMoreRef = useRef(false);
  useEffect(() => {
    isFetchingMoreRef.current = isFetchingMore;
  }, [isFetchingMore]);


  const handleSearch = useCallback(async () => {
    if (!username.trim()) return;

    // Fix: Immediately clear previous error and data for a clean search state
    setError(null);
    setGithubData(null);

    const cacheKey = `github-cache-${username}`;
    const cachedItem = localStorage.getItem(cacheKey);

    if (cachedItem) {
      const { data, timestamp } = JSON.parse(cachedItem) as CachedData;
      if (Date.now() - timestamp < CACHE_EXPIRATION_MS) {
        setGithubData(data);
        return; // Cache hit, no need to fetch
      }
    }

    setIsLoading(true);

    try {
      const response = await api.get(`/github/user-repos/?username=${username}&page=1`);
      const newData: CachedData = {
        data: response.data,
        timestamp: Date.now(),
      };
      localStorage.setItem(cacheKey, JSON.stringify(newData));
      setGithubData(response.data);
    } catch (err: any) {
      if (err.response?.status === 429) {
        setError('API rate limit exceeded. Please try again later.');
      } else {
        setError(err.response?.data?.error || 'Failed to fetch GitHub data');
      }
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  const loadMoreRepos = useCallback(async () => {
    if (!githubData || isFetchingMoreRef.current || githubData.pagination.currentPage >= githubData.pagination.totalPages) {
      return;
    }

    isFetchingMoreRef.current = true; // Lock fetching
    setIsFetchingMore(true);
    const nextPage = githubData.pagination.currentPage + 1;

    try {
      const response = await api.get(`/github/user-repos/?username=${username}&page=${nextPage}`);
      const updatedData: GitHubResponse = {
        ...githubData,
        repos: [...githubData.repos, ...response.data.repos],
        pagination: response.data.pagination,
      };
      const newCachedData: CachedData = {
        data: updatedData,
        timestamp: Date.now(),
      };
      localStorage.setItem(`github-cache-${username}`, JSON.stringify(newCachedData));
      setGithubData(updatedData);
    } catch (err: any) {
      if (err.response?.status === 429) {
        setError('API rate limit exceeded. Please try again later.');
      } else {
        setError(err.response?.data?.error || 'Failed to fetch more repositories');
      }
    } finally {
      setIsFetchingMore(false);
      isFetchingMoreRef.current = false; // Unlock fetching
    }
  }, [githubData, username]);

  useEffect(() => {
    const handleScroll = () => {
      // Fix: Use the ref to prevent multiple calls while a fetch is in progress
      if (!isFetchingMoreRef.current && window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
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
