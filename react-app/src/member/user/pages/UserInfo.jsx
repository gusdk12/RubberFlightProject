import React, { useContext, useState } from 'react';
import { Box, Flex, Divider, Avatar, Text, Button, Icon } from '@chakra-ui/react';
import { LoginContext } from '../../../general/user/contexts/LoginContextProvider';
import { FiPlus } from 'react-icons/fi';
import { IoMdSettings } from 'react-icons/io'; 
import { AiOutlineLogout } from 'react-icons/ai';
import CouponModal from './CouponModal'; 
import UserInfoModal from './UserInfoModal';

const UserInfo = () => {
  const { userInfo } = useContext(LoginContext); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true); 
  };

  const handleCloseModal = () => {
    setModalOpen(false); 
  };

  const userInfoModalOpen = () => {
    setInfoModalOpen(true);
  }

  
  const userInfoModalClose = () => {
    setInfoModalOpen(false);
  }

  return (
    <>
      <Box
        style={{
          maxWidth: '800px',
          minWidth: '800px',
          width: '90%',
          height: '88vh', 
          margin: 'auto',
          marginTop: '20px',
        }}
      >
        <Flex p={4} bg="white" boxShadow="md" align="center" justify="space-between">
          <Flex align="center">
            <Avatar 
              size="sm" 
              name={userInfo.name} 
              src={process.env.PUBLIC_URL + `/images/${userInfo.image}`} 
              backgroundColor="#dde6f5d7" 
            />
            <Box ml={3}>
              <Text fontSize="lg" fontWeight="bold">{userInfo.name}</Text>
              <Text fontSize="sm" color="gray.600">{userInfo.email}</Text> 
            </Box>
            <Icon as={IoMdSettings} boxSize={6} ml={4} cursor="pointer" onClick={userInfoModalOpen}/>
          </Flex>
          <Button leftIcon={<AiOutlineLogout />} colorScheme="red">
            로그아웃
          </Button>
        </Flex>
        
        <Box p={4}>
          <Divider orientation="horizontal" />
          <Flex mt={4}>
            <Box flex="1" p={4}>
              <Text fontSize="lg" fontWeight="bold">이용내역 52회</Text>
              <Text fontSize="lg" fontWeight="bold">나의 리뷰 15개</Text>
              <Flex align="center" mt={2}>
                <Text fontSize="lg" fontWeight="bold">사용 가능 쿠폰 2장</Text>
                <Icon as={FiPlus} boxSize={5} ml={2} cursor="pointer" onClick={handleOpenModal} />
              </Flex>
            </Box>
            <Divider orientation="vertical" height="100%" />
            <Box flex="1" p={4}>
              <Text fontSize="lg" fontWeight="bold">나의 서비스</Text>
              <Flex mt={2} justify="space-between">
                <Text color="blue.500" cursor="pointer">일정</Text>
                <Text color="blue.500" cursor="pointer">체크리스트</Text>
              </Flex>
            </Box>
          </Flex>
        </Box>

        <Box p={4} mt={4} bg="gray.100" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">가이드라인</Text>
          <Text mt={2}>여기에는 가이드라인에 대한 내용을 추가하세요.</Text>
        </Box>

        <CouponModal isOpen={isModalOpen} onClose={handleCloseModal} />
        <UserInfoModal isOpen={isInfoModalOpen} onClose={userInfoModalClose}/>
      </Box>
    </>
  );
};

export default UserInfo;
