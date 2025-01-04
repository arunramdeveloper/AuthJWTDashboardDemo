import React, { useState } from 'react';
import axios from 'axios';

const AuthComponent = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('john@mail.com');
  const [password, setPassword] = useState('changeme');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Show loading indicator

    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
        email,
        password,
      });

      // Assuming the response contains tokens
      const { access_token, refresh_token } = response.data;

      // Store tokens in localStorage
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      // Update login state and redirect to dashboard
      setIsLoggedIn(true);
      window.location.href = '/dashboard'; // Redirect to dashboard
    } catch (error) {
      setErrorMessage('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ width: '300px' }}>
        <div className="card-body">
          <h5 className="card-title text-center">Login</h5>
          <p className='text-center' >JWT authentication</p>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading} // Disable the button when loading
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="text-center mt-3">
            <p>login with: john@mail.com</p>
            <p>password: changeme</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
