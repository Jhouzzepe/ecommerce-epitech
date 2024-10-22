import api from './api';

const register = (userData) => {
  return api.post('/register/', userData);
};

const login = (username, password, rememberMe) => {
  return api
    .post('/token/', {
      username,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(response.data));
        } else {
          sessionStorage.setItem('user', JSON.stringify(response.data));
        }
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
};

const getUserProfile = () => {
  const user = getCurrentUser();
  if (user && user.access) {
    return api.get('/profile/', {
      headers: {
        Authorization: `Bearer ${user.access}`
      }
    });
  }
  return Promise.reject("No user logged in");
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  getUserProfile,
};

export default authService;
