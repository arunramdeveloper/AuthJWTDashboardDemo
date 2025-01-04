import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const LayoutComponent = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove tokens from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Log message to console
    console.log('Successfully logged out and redirected to login page.');

    // Update login state and redirect
    setIsLoggedIn(false);  // Update parent component state to reflect logout
    navigate('/');  // Navigate back to the AuthComponent (login page)
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* Header */}
      <header className="bg-dark text-white p-3">
        <h3>Dashboard Header</h3>
      </header>

      <div className="d-flex flex-grow-1">
        {/* Left Navbar */}
        <nav className="bg-light p-3" style={{ width: '200px' }}>
          <h4>Menu</h4>
          <ul className="list-unstyled">
            <li>
              <Link to="profile" className="text-dark text-decoration-none">
                Profile
              </Link>
            </li>
            <li>
              <Link to="users" className="text-dark text-decoration-none">
                Users
              </Link>
            </li>
            <li>
              <Link to="upload" className="text-dark text-decoration-none">
                Upload
              </Link>
            </li>
            <li>
              <Link to="download" className="text-dark text-decoration-none">
                Download
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="btn btn-danger mt-3 w-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
          {/* Dynamic Content */}
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center p-3">
        <p>©  Dashboard. arunram.developer.</p>
      </footer>
    </div>
  );
};

export default LayoutComponent;
