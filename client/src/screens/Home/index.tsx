import React from 'react';
import Header from '@/components/Header';
import { useHome } from '@/hooks/useHome';
import '@/theme/Home.css';

const Home = () => {
  const {
    username,
    setUsername,
    isLoading,
    isFetchingMore,
    error,
    githubData,
    handleSearch,
  } = useHome();

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

        {error && <div className="error-message">{error}</div>}

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
              <h3>{`Repositories (${githubData.pagination.totalRepos})`}</h3>
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
              {isFetchingMore && <div className="loading-more">Loading more...</div>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;