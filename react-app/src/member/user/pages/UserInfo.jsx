import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Box, Flex, Divider, Avatar, Text, Button, Icon } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { IoMdSettings } from 'react-icons/io'; 
import { AiOutlineLogout } from 'react-icons/ai';
import CouponModal from './CouponModal'; 
import { LoginContext } from '../../../general/user/contexts/LoginContextProvider';

const UserInfo = () => {
  const { userInfo } = useContext(LoginContext); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleOpenModal = () => {
    setModalOpen(true); 
  };

  const handleCloseModal = () => {
    setModalOpen(false); 
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8282/users/${userInfo.id}/info`);
        setUser(response.data);
      } catch (error) {
        console.error('An error occurred while fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [userInfo.id]);

  if (!user) {
    return <Text>Loading...</Text>; // 로딩 중 표시
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
              name={user.name} 
              src={user.image} 
              backgroundColor="#dde6f5d7" 
            />
            <Box ml={3}>
              <Text fontSize="lg" fontWeight="bold">{user.name} 님</Text>
              <Text fontSize="sm" color="gray.600">{user.email}</Text> 
            </Box>
            <Icon as={IoMdSettings} boxSize={6} ml={4} cursor="pointer" />
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
          <Text mt={2} >러버 플라이트 적극적으로 활용하기</Text>
        </Box>

        <CouponModal isOpen={isModalOpen} onClose={handleCloseModal} /> {/* 모달 렌더링 */}
      </Box>
    </>
  );
};

export default UserInfo;
