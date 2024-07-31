import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { LoginContext } from '../../contexts/LoginContextProvider';

const Header = () => {
  const { isLogin, logout, userInfo } = useContext(LoginContext);

  return (
    <div>
      {!isLogin ? (
        <Button as={Link} to="/login" colorScheme="teal" variant="outline">
          로그인
        </Button>
      ) : (
        <Button colorScheme="teal" onClick={() => logout()}>
          로그아웃 ({userInfo.id}:{userInfo.username}:{userInfo.role})
        </Button>
      )}
    </div>
  );
};

export default Header;
