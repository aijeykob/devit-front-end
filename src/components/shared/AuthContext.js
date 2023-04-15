import axios from 'axios';
import { createContext, useState } from 'react';
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

import jwtInterceoptor from './jwtInterceptor';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (localStorage.getItem('tokens')) {
      let tokens = JSON.parse(localStorage.getItem('tokens'));
      return jwt_decode(tokens.accessToken);
    }
    return null;
  });

  const navigate = useNavigate();

  const login = async (payload) => {
    try {
      const apiResponse = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, payload);
      localStorage.setItem('tokens', JSON.stringify(apiResponse.data));
      setUser(jwt_decode(apiResponse.data.accessToken));
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Error Login');
      }
    }
  };
  const logout = async () => {
    // invoke the logout API call, for our NestJS API no logout API

    localStorage.removeItem('tokens');
    setUser(null);
    navigate('/');
  };
  jwtInterceoptor.setLogout(logout);
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
