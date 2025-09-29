import React, { useState } from 'react';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Homepage from './components/Homepage.jsx';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const switchToSignup = () => setCurrentView('signup');
  const switchToLogin = () => setCurrentView('login');

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setCurrentView('homepage');
  };

  const handleSignup = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setCurrentView('homepage');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentView('login');
  };

  // Enhanced Login component with authentication
  const LoginWithAuth = () => (
    <Login 
      onSwitchToSignup={switchToSignup}
      onLogin={handleLogin}
    />
  );

  // Enhanced Signup component with authentication
  const SignupWithAuth = () => (
    <Signup 
      onSwitchToLogin={switchToLogin}
      onSignup={handleSignup}
    />
  );

  return (
    <div className="App">
      {isAuthenticated ? (
        <Homepage onLogout={handleLogout} user={user} />
      ) : (
        <>
          {currentView === 'login' ? (
            <LoginWithAuth />
          ) : (
            <SignupWithAuth />
          )}
        </>
      )}
    </div>
  );
}

export default App;
