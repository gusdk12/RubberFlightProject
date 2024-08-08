import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // SweetAlert2를 사용

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
        Swal.fire({
          title: '로그인 성공',
          text: '메인화면으로 이동합니다.',
          icon: 'success',
          confirmButtonText: '확인',
          backdrop: true, // 백드롭을 사용하여 화면을 흐리게 하고, 알림이 제일 앞에 나타나게 함
          position: 'center',
          customClass: {
            container: 'swal-container'
          },
          didOpen: () => {
            document.querySelector('.swal2-container').style.zIndex = 9999; // zIndex 조정
          }
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: '로그인 실패',
        text: '아이디 또는 비밀번호가 일치하지 않습니다.',
        icon: 'error',
        confirmButtonText: '확인',
        backdrop: true,
        position: 'center',
        customClass: {
          container: 'swal-container'
        },
        didOpen: () => {
          document.querySelector('.swal2-container').style.zIndex = 9999; // zIndex 조정
        }
      });
    }
  };

  // 로그아웃
  const logout = (force = false) => {
    if (force) {
      logoutSetting();
      Swal.fire({
        title: '로그아웃되었습니다.',
        text: '메인화면으로 이동합니다.',
        icon: 'success',
        confirmButtonText: '확인',
        backdrop: true,
        position: 'center',
        customClass: {
          container: 'swal-container'
        },
        didOpen: () => {
          document.querySelector('.swal2-container').style.zIndex = 9999; // zIndex 조정
        }
      }).then(() => {
        navigate("/");
      });
      return;
    }

    Swal.fire({
      title: '로그아웃 하시겠습니까?',
      text: '로그아웃을 진행합니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '로그아웃',
      cancelButtonText: '취소',
      backdrop: true,
      position: 'center',
      customClass: {
        container: 'swal-container'
      },
      didOpen: () => {
        document.querySelector('.swal2-container').style.zIndex = 9999; // zIndex 조정
      }
    }).then((result) => {
      if (result.isConfirmed) {
        logoutSetting();
        Swal.fire({
          title: '로그아웃되었습니다.',
          text: '메인화면으로 이동합니다.',
          icon: 'success',
          confirmButtonText: '확인',
          backdrop: true,
          position: 'center',
          customClass: {
            container: 'swal-container'
          },
          didOpen: () => {
            document.querySelector('.swal2-container').style.zIndex = 9999; // zIndex 조정
          }
        }).then(() => {
          window.location.reload();
        });
      }
    });
  };

  // 로그인 세팅
  const loginSetting = (userData, accessToken) => {
    const { id, username, role, name } = userData;

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