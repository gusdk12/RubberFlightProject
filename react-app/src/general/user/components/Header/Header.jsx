
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';


const Header = () => {

    const {isLogin, logout, userInfo } = useContext(LoginContext);


  return (
    <>
     
                <Link className="nav-link" to="/login">로그인</Link>
    
    </>    
  );
};

export default Header;


