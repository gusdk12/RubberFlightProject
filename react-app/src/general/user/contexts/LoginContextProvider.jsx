import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as Swal from '../../../apis/alert';
import * as auth from '../../../apis/auth';
import api from '../../../apis/api';

export const LoginContext = createContext();
LoginContext.displayName = 'LoginContextName';

const LoginContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // Context에서 다룰 상태
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [roles, setRoles] = useState({ isMember: false, isAdmin: false });

  // 로그인 체크
  const loginCheck = async (isAuthPage = false) => {
    const accessToken = Cookies.get('accessToken');

    if (!accessToken) {
      logoutSetting();
      if (isAuthPage) navigate('/login');
      return;
    }

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    try {
      const response = await auth.userInfo();
      if (response && response.status === 200) {
        loginSetting(response.data, accessToken);
      } else {
        logoutSetting();
      }
    } catch (error) {
      logoutSetting();
    }
  };

  useEffect(() => {
    loginCheck();
  }, []);

  // 로그인 요청
  const login = async (username, password, rememberId) => {
    if (rememberId) Cookies.set('rememberId', username);
    else Cookies.remove('rememberId');

    try {
      const response = await auth.login(username, password);
      const { status, headers } = response;
      const authorization = headers.authorization;
      const accessToken = authorization.replace("Bearer ", "");

      if (status === 200) {
        Cookies.set("accessToken", accessToken);
        loginCheck();
        Swal.alert("로그인 성공", "메인화면으로 이동합니다", "success", () => { navigate("/") });
      }
    } catch (error) {
      Swal.alert('로그인 실패', '아이디 또는 비밀번호가 일치하지 않습니다.', "error");
    }
  };

  // 로그아웃
  const logout = (force = false) => {
    if (force) {
      logoutSetting();
      navigate("/");
      return;
    }

    Swal.confirm("로그아웃 하시겠습니까?", "로그아웃을 진행합니다", "warning",
      (result) => {
        if (result.isConfirmed) {
          logoutSetting();
          navigate("/");
        }
      }
    );
  };

  // 로그인 세팅
  const loginSetting = (userData, accessToken) => {
    const { id, username, role, name } = userData;
    console.log(userData);

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    setIsLogin(true);
    setUserInfo({ id, username, role, name });

    const updatedRoles = { isMember: false, isAdmin: false };
    if (role) {
      role.split(',').forEach((r) => {
        if (r === 'ROLE_MEMBER') updatedRoles.isMember = true;
        if (r === 'ROLE_ADMIN') updatedRoles.isAdmin = true;
      });
    }
    setRoles(updatedRoles);
  };

  // 로그아웃 세팅
  const logoutSetting = () => {
    setIsLogin(false);
    setUserInfo({});
    setRoles({ isMember: false, isAdmin: false });
    Cookies.remove('accessToken');
    api.defaults.headers.common.Authorization = undefined;
  };

  return (
    <LoginContext.Provider value={{ isLogin, userInfo, roles, loginCheck, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

// 로그인한 유저 정보 가져오기
export const useUser = () => useContext(LoginContext);

export default LoginContextProvider;
