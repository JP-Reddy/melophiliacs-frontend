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
import { useNavigate, useLocation } from 'react-router-dom'; // Added useLocation

const AuthContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  // No more client-side token state or localStorage for the token itself
  const navigate = useNavigate();
  const location = useLocation(); // To check if we just came from a login redirect

  useEffect(() => {
    // Check auth status when the app loads or when user navigates to a new page after login
    // The `location.key` changes on navigation, providing a trigger after redirect from backend.
    // We also want to check on initial load.
    checkAuthStatus();
  }, [location.key]); // Re-check when navigation happens (e.g., after redirect from /callback)

  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      // This endpoint should be protected by the HttpOnly cookie session
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
        credentials: 'include', // Crucial for sending cookies
      });
      
      setIsAuthenticated(response.ok);
      
      if (response.ok && window.location.pathname === '/') {
        // If authenticated and on homepage, redirect to dashboard
        // This handles the case where user opens the app and is already logged in via cookie
        navigate('/dashboard', { replace: true });
      }
      
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    // Redirect to backend which handles Spotify OAuth and sets HttpOnly cookie on callback
    const frontendUrl = window.location.origin;
    window.location.href = `${API_BASE_URL}/api/v1/auth/login?final_redirect_uri=${encodeURIComponent(frontendUrl + '/dashboard')}`;
  };

  const logout = async () => {
    try {
      // Backend should clear Redis session AND send headers to clear HttpOnly cookie
      await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
        method: 'POST', 
        credentials: 'include', // Crucial for sending cookies
      });
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Proceed with client-side logout actions anyway
    } finally {
      setIsAuthenticated(false);
      navigate('/');
    }
  };

  // Renamed from fetchWithToken to fetchAuthenticatedApi
  const fetchAuthenticatedApi = async (endpoint, options = {}) => {
    const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
      ...options,
      credentials: 'include', // Crucial for sending cookies
      headers: {
        ...options.headers,
        // No Authorization header needed; cookie is sent automatically
      },
    });

    if (response.status === 401) {
      // Unauthorized, cookie session likely invalid or expired
      console.warn('API request unauthorized (401). Logging out.');
      setIsAuthenticated(false);
      navigate('/'); // Redirect to login
      throw new Error('Session expired or token invalid.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'API request failed with status: ' + response.status }));
      throw new Error(errorData.detail || 'API request failed');
    }
    
    if (response.status === 204) { // Handle No Content
        return null;
    }

    return response.json();
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        login, 
        logout, 
        fetchAuthenticatedApi, // Use the new function name
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