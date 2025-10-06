import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';


const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <Header />
      <main className="home-content">
        <h2>Welcome, {user?.name}!</h2>
        <p>You have successfully logged in.</p>
      </main>
    </div>
  );
};

export default Home;