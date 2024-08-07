import React from 'react';
import MenuBar from '../../../general/common/SideMenu/MenuBar';
import FlightInfoList from '../../flightInfo/pages/FlightInfoList';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from '../../../general/common/Header/Header';
import '../css/UserInfo.css';

const UserInfo = () => {
    return (
      <>
      <div className='mypage_body'> 
        <Header/>
        <Flex className='info_body'>
        <MenuBar />
        <Box flex="1" p={4}>
          <Outlet />
        </Box>
        </Flex>
      </div>
      </>
    );
};

export default UserInfo;