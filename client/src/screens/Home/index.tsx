import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import api from '@/services/api';
import '@/theme/Home.css';

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

interface GitHubResponse {
  user: GitHubUser;
  repos: GitHubRepo[];
}

const Home = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [githubData, setGithubData] = useState<GitHubResponse | null>(null);

  const handleSearch = async () => {
    if (!username.trim()) return;

    setIsLoading(true);
    setError(null);
    setGithubData(null);

    try {
      const response = await api.get(`/github/user-repos/?username=${username}`);
      setGithubData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch GitHub data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home">
      <Header />
      <main className="home-content">
        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by exact GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {githubData && (
          <div className="github-content">
            <div className="user-profile">
              <img src={githubData.user.avatar} alt={githubData.user.name} className="user-avatar" />
              <div className="user-info">
                <h2>{githubData.user.name}</h2>
                <p className="username">@{githubData.user.username}</p>
                <p className="bio">{githubData.user.bio}</p>
                <div className="user-info-footer">
                  <div className="stats">
                    <span>{githubData.user.followersCount} followers</span>
                    <span>{githubData.user.followingCount} following</span>
                  </div>
                  <a href={githubData.user.url} target="_blank" rel="noopener noreferrer" className="github-link">
                    View Profile
                  </a>
                </div>
              </div>
            </div>

            <div className="repositories">
              <h3>Repositories</h3>
              <div className="repo-grid">
                {githubData.repos.map(repo => (
                  <div key={repo.id} className="repo-card">
                    <h4>{repo.name}</h4>
                    {repo.description && <p>{repo.description}</p>}
                    <div className="repo-button-container">
                      <a href={repo.url} target="_blank" rel="noopener noreferrer" className="repo-button">
                        View Repository
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;