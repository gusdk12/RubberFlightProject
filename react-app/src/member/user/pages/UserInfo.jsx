import React, { useEffect } from 'react';
import MenuBar from '../../../general/common/SideMenu/MenuBar';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from '../../../general/common/Header/Header';

const UserInfo = () => {

  useEffect(() => {
    document.body.style.overflowY = 'scroll';
    document.body.style.backgroundColor = '#dde6f5d7';
  }, []);

    return (
      <>
      <div style={{ 
        width: '1300px', 
        top: '15px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        position: 'relative', 
        alignContent: 'center', 
        zIndex: '1000', 
        marginBottom: '20px',
        padding: '20px',
        transition: 'all 0.3s ease'
      }}> 
        <Header/>
        <Flex>
          <MenuBar />
          <Box flex="1" p={4} style={{ 
            backgroundColor: 'white', 
            borderRadius: '10px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            marginLeft: '20px',
            minHeight: '120vh', 
            height: 'auto',  
          }}>
            <Outlet />
          </Box>
        </Flex>
      </div>
      </>
    );
};

export default UserInfo;
