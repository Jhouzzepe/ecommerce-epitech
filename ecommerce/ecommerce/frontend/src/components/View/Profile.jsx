import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { useToken } from '../../contexts/UserTokenContext';
import ProfileComponent from '../ProfileComponents/ProfileComponents';
import FacturationComponent from '../ProfileComponents/FacturationComponents';
import OrdersComponent from '../ProfileComponents/OrdersComponents'; // Import the OrdersComponent

const Profile = () => {
  const { accessToken } = useToken();
  const { refreshToken } = useToken();
  const [user, setUser] = useState(null);
  const [activeComponent, setActiveComponent] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    authService.getUserProfile()
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the profile!', error);
      });
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-50">
      <div className="md:hidden w-full bg-gray-800 text-white shadow-md">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Menu</h2>
        </div>
        <nav className="overflow-y-auto">
          <ul className="space-y-2 p-4">
            <li>
              <button
                onClick={() => setActiveComponent('profile')}
                className={`w-full text-left px-4 py-2 rounded transition-colors duration-200 ${
                  activeComponent === 'profile' ? 'bg-gray-900 text-white' : 'hover:bg-gray-700'
                }`}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent('facturation')}
                className={`w-full text-left px-4 py-2 rounded transition-colors duration-200 ${
                  activeComponent === 'facturation' ? 'bg-gray-900 text-white' : 'hover:bg-gray-700'
                }`}
              >
                Facturation
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent('orders')}
                className={`w-full text-left px-4 py-2 rounded transition-colors duration-200 ${
                  activeComponent === 'orders' ? 'bg-gray-900 text-white' : 'hover:bg-gray-700'
                }`}
              >
                Orders
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 mt-4 rounded bg-red-600 hover:bg-red-700 transition-colors duration-200"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 bg-gray-800 text-white shadow-md flex flex-col">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Menu</h2>
        </div>
        <nav className="flex-grow overflow-y-auto">
          <ul className="space-y-2 p-4">
            <li>
              <button
                onClick={() => setActiveComponent('profile')}
                className={`w-full text-left px-4 py-2 rounded transition-colors duration-200 ${
                  activeComponent === 'profile' ? 'bg-gray-900 text-white' : 'hover:bg-gray-700'
                }`}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent('facturation')}
                className={`w-full text-left px-4 py-2 rounded transition-colors duration-200 ${
                  activeComponent === 'facturation' ? 'bg-gray-900 text-white' : 'hover:bg-gray-700'
                }`}
              >
                Facturation
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent('orders')}
                className={`w-full text-left px-4 py-2 rounded transition-colors duration-200 ${
                  activeComponent === 'orders' ? 'bg-gray-900 text-white' : 'hover:bg-gray-700'
                }`}
              >
                Orders
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 mt-4 rounded bg-red-600 hover:bg-red-700 transition-colors duration-200"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 overflow-y-auto">
        {user ? (
          <>
            {activeComponent === 'profile' && (
              <div className="max-w-full max-h-full overflow-y-auto bg-white rounded-lg shadow-lg p-4 md:p-6">
                <ProfileComponent accessToken={accessToken} user={user} onLogout={handleLogout} refreshToken={refreshToken} />
              </div>
            )}
            {activeComponent === 'facturation' && (
              <div className="max-w-full max-h-full overflow-y-auto bg-white rounded-lg shadow-lg p-4 md:p-6">
                <FacturationComponent accessToken={accessToken} />
              </div>
            )}
            {activeComponent === 'orders' && (
              <div className="max-w-full max-h-full overflow-y-auto bg-white rounded-lg shadow-lg p-4 md:p-6">
                <OrdersComponent accessToken={accessToken} />
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;