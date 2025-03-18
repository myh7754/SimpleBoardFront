import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from './axiosConfig';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/auth/check-auth');

      if (response.data.isAuthenticated) { //isAuthenticated가 true일때
        setIsAuthenticated(true);
        setUser(response.data.user);
      } else {
        const refresh = await refreshAccessToken();
        // if (refresh) {
        const refreshResponse = await axios.post('/api/auth/check-auth');
        if (refreshResponse.data.isAuthenticated) {
          setIsAuthenticated(true);
          setUser(refreshResponse.data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
        // } else {
        //   setIsAuthenticated(false);
        //   setUser(null);
        // }
      }
    } catch (error) {
      console.error("인증 확인 오류:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  //리프레시 갱신
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('/api/auth/refresh');
      if (response.status === 200) {
        console.log("리프레시")
        return true;
      }
      return false;
    } catch (error) {
      console.error('토큰 갱신 오류 :', error);
      return false
    }
  }

  const login = async (req) => {
    try {
      const response = await axios.post('/api/auth/login', req);
      if (response.status === 200) {
        console.log("성공로직 실행")
        setIsAuthenticated(true);
        setUser(response.data.user);
        console.log("로그인여부 :", isAuthenticated);
        return true;
      }
      console.log("실패로직 실행")
      return false;
    } catch (error) {
      console.log("로그인 중 오류 발생");
      return false;
    }
  }

  const logout = async (navigate) => {
    try {
      await axios.post('/api/auth/refresh/logout');
      // 쿠키 삭제 (기본 경로)
      Cookies.remove('accessToken');

      // 특정 경로의 쿠키 삭제 
      Cookies.remove('refreshToken', { path: '/api/auth/refresh' });
      setIsAuthenticated(false);
      setUser(null);
      if (navigate) {
        navigate('/');
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생', error);
      alert('로그아웃 중 오류 발생');
    }
  }

  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    checkAuth();
  }, []);



  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);