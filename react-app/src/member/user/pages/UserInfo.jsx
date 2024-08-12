import React, { useEffect } from 'react';
import MenuBar from '../../../general/common/SideMenu/MenuBar';
import { Box, Flex, Divider, Avatar, Text } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from '../../../general/common/Header/Header';
import { LoginContext } from '../../../general/user/contexts/LoginContextProvider';

const UserInfo = () => {
  const { userInfo } = useContext(LoginContext); 

  useEffect(() => {
    document.body.style.overflowY = 'scroll';
    document.body.style.backgroundColor = '#dde6f5d7';
  }, []);

  return (
    <>
      {/* 마이페이지 화면 */}
      <div style={{ 
        width: '1320px', 
        top: '15px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        position: 'relative', 
        marginBottom: '60px',
        padding: '20px',
        transition: 'all 0.3s ease'
      }}> 
        <Header />
        <Flex style={{ boxShadow: '0 5px 9px rgba(0, 0, 0, 0.1)' }}>
          <MenuBar />

          {/* 컨텐츠 박스 */}
          <Box flex="1" p={4} style={{ 
            backgroundColor: '#fbfdff', 
            padding: '20px',
            marginLeft: '0px',  
            minHeight: '120vh',
            height: 'auto',  
          }}>
            {/* 유저 프로필과 이름 */}
            <Flex alignItems="center" mb={4} mr={5} justifyContent="flex-end">
              <Avatar 
                size="sm" 
                name={userInfo.name} 
                src={process.env.PUBLIC_URL + `/images/${userInfo.image}`}
                backgroundColor="#dde6f5d7"
              />
              <Text fontSize="lg" fontWeight="bold" ml={3}>
                {userInfo.username} 
              </Text>
            </Flex>
            <Divider mb={4} />
            
            {/* 컨텐츠 */}
            <Outlet />
          </Box>
        </Flex>
      </div>
    </>
  );
};

export default UserInfo;
