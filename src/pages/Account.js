import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AccountPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const hasAccount = localStorage.getItem('hasAccount') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('hasAccount');
    localStorage.removeItem('email');
    navigate('/login');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the API based on their email
        const email = localStorage.getItem('email');
        const response = await fetch(`http://127.0.0.1:5000/users/${email}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    // Check if the user has an account
    if (hasAccount) {
      // Retrieve the user's email from localStorage
      const email = localStorage.getItem('email');
      setUser({ email });

      // Fetch the user's data from the API
      if (email) {
        fetchUserData();
      } else {
        console.log('No email found');
      }
    }
  }, [hasAccount]);

  return (
    <div className="bg-gray-800 min-h-screen">
      <Navbar />

      {!hasAccount && (
        <div className="container mx-auto mt-8">
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <p className="text-lg font-semibold mb-4">You don't have an account.</p>
            <p>
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
                Sign up
              </Link>{' '}
              or{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
                login
              </Link>{' '}
              to create an account.
            </p>
          </div>
        </div>
      )}

      {user && user.email && (
        <div className="container mx-auto mt-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              <h3 className="text-lg font-semibold leading-6 text-gray-900">Applicant Information</h3>
              <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">Personal details</p>
            </div>

            <div className="border-t border-gray-100">
              <dl>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:p-6">
                  <dt className="text-sm font-medium leading-5 text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm leading-5 text-gray-900 sm:col-span-2">{user.email}</dd>
                </div>

                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:p-6">
                  <dt className="text-sm font-medium leading-5 text-gray-500">Password</dt>
                  <dd
                    className="flex items-center mt-1 text-sm leading-5 text-gray-900 sm:col-span-2"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="mr-2">
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3 h-3"
                        >
                          <path
                            d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3 h-3"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                    {showPassword ? user.password : '********'}
                  </dd>
                </div>

                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:p-6">
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md font-semibold"
                  >
                    Logout
                  </button>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
