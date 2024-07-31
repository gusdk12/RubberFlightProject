import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';
import { Button } from '@chakra-ui/react';


const Header = () => {

    const {isLogin, logout, userInfo } = useContext(LoginContext);


  return (
    <>
    { !isLogin ?
    <>
     
                <Link className="nav-link" to="/login">로그인</Link>
    </>
    :
    <>
    <Button variant="primary" onClick={ () => logout() }>로그아웃({userInfo.id}:{userInfo.username}:{userInfo.role})</Button>    
    </>
    }    
    </>
  );
};

export default Header;


