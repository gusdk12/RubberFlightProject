import React from 'react';
import MenuBar from '../../../general/common/SideMenu/MenuBar';
import FlightInfoList from '../../flightInfo/pages/FlightInfoList';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const UserInfo = () => {
    return (
      <Flex>
        <MenuBar />
        <Box flex="1" p={4}>
          <Outlet />
        </Box>
      </Flex>
    );
};

export default UserInfo;