import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthComponent from './components/auth/AuthComponent';
import LayoutComponent from './components/dashboard/LayoutComponent';
import ProfileComponent from './components/dashboard/ProfileComponent';
import UserComponent from './components/dashboard/UserComponent';
import UploadComponent from './components/dashboard/UploadComponent';
import DownloadComponent from './components/dashboard/DownloadComponent';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for the token initially to decide the initial state of isLoggedIn
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true); // Set logged in state based on token presence
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Route for AuthComponent when not logged in */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <AuthComponent setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <LayoutComponent setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />}
        >
          <Route path="profile" element={<ProfileComponent />} />
          <Route path="users" element={<UserComponent />} />
          <Route path="upload" element={<UploadComponent />} />
          <Route path="download" element={<DownloadComponent />} />
        </Route>

        {/* Redirect for other routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
