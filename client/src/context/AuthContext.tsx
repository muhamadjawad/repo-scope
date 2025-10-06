import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '@/services/api';
import type { User } from '@/types';
// import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (credentials: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Omit<User, 'id'>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const validateToken = async () => {
            const token = Cookies.get('user-token');
            if (token) {
                try {
                    const response = await api.get('/auth/profile');
                    // The API returns the user object directly in the response data
                    setUser(response.data);
                } catch (error) {
                    console.error('Session validation failed:', error);
                    Cookies.remove('user-token');
                }
            }
            setIsLoading(false);
        };

        validateToken();
    }, []);

    const updateProfile = async (userData: Omit<User, 'id'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.put('/auth/profile', userData);
      setUser(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.post('/auth/login', credentials);
            const { token, user } = response.data;

            console.log('Login Response:', response.data); // Added for debugging
            console.log('Token:', token); // Added for debugging

            if (token) {
                Cookies.set('user-token', token, { expires: 7, path: '/' });

                // Verify that the cookie was set
                const savedToken = Cookies.get('user-token');
                console.log('Token from cookie after setting:', savedToken);

                if (savedToken) {
                    setUser(user);
                    navigate('/');
                } else {
                    setError('Failed to save authentication token.');
                }

            } else {
                setError('Login successful, but no token was provided.');
            }

        } catch (err: any) {
            console.log(err);
            setError(err.response?.data?.message || 'Failed to login');
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (credentials: { name: string; email: string; password: string }) => {
        setIsLoading(true);
        setError(null);
        try {
            await api.post('/auth/register', credentials);
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to register');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        Cookies.remove('user-token');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                error,
        login,
        register,
        logout,
        updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
