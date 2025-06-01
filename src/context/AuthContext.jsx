// // src/context/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = async () => {
//     try {
//       const response = await fetch('https://deadmousse.pythonanywhere.com/check-auth', {
//         credentials: 'include'  // Important for cookies
//       });
      
//       if (response.ok) {
//         setIsAuthenticated(true);
//         // If user is authenticated and on home page, redirect to dashboard
//         if (window.location.pathname === '/') {
//           navigate('/dashboard');
//         }
//       } else {
//         setIsAuthenticated(false);
//         console.log("Not authenticated");
//         // If user is not authenticated and not on home page, redirect to home
//         if (window.location.pathname !== '/') {
//           navigate('/');
//         }
//       }
//     } catch (error) {
//       console.error('Auth check failed:', error);
//       setIsAuthenticated(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = () => {
//     window.location.href = 'https://deadmousse.pythonanywhere.com/login';
//   };

//   const logout = async () => {
//     try {
//       await fetch('https://deadmousse.pythonanywhere.com/logout', {
//         credentials: 'include'
//       });
//       setIsAuthenticated(false);
//       navigate('/');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuthStatus }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('session_token'));
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token in URL when component mounts
    const params = new URLSearchParams(window.location.search);
    const newToken = params.get('token');
    console.log("Token ", newToken);
    if (newToken) {
      setToken(newToken);
      setIsAuthenticated(true);
      localStorage.setItem('session_token', newToken);
      // Clean URL
      window.history.replaceState({}, document.title, "/dashboard");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Verify token whenever it changes
    if (token) {
      checkAuthStatus();
    }
  }, [token]);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('https://deadmousse.pythonanywhere.com/check-auth', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const isValid = response.ok;
      setIsAuthenticated(isValid);
      
      if (!isValid) {
        localStorage.removeItem('session_token');
        setToken(null);
        if (window.location.pathname !== '/') {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    window.location.href = 'https://deadmousse.pythonanywhere.com/login';
  };

  const logout = async () => {
    try {
      await fetch('https://deadmousse.pythonanywhere.com/logout', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      localStorage.removeItem('session_token');
      setToken(null);
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Helper function for making authenticated requests
  const fetchWithToken = async (url, options = {}) => {
    if (!token) throw new Error('No authentication token');
    
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    };

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      // Handle 401 Unauthorized
      if (response.status === 401) {
        setIsAuthenticated(false);
        localStorage.removeItem('session_token');
        setToken(null);
        navigate('/');
        throw new Error('Session expired');
      }
      throw new Error('API request failed');
    }

    return response.json();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        login, 
        logout, 
        fetchWithToken,
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};