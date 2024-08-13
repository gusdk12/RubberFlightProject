import React, { useContext, useState } from 'react';
import { Box, Flex, Divider, Avatar, Text, Button, Icon } from '@chakra-ui/react';
import { LoginContext } from '../../../general/user/contexts/LoginContextProvider';
import { FiPlus } from 'react-icons/fi';
import { IoMdSettings } from 'react-icons/io'; 
import { AiOutlineLogout } from 'react-icons/ai';
import { BsCalendar, BsCheckCircle } from 'react-icons/bs'; 
import CouponModal from './CouponModal'; 
import { useNavigate } from 'react-router-dom'; 

const UserInfo = () => {
  const { userInfo } = useContext(LoginContext); 
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setModalOpen(true); 
  };

  const handleCloseModal = () => {
    setModalOpen(false); 
  };

  const navigateToSchedule = () => {
    navigate('/schedule'); 
  };

  const navigateToChecklist = () => {

  };

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
          <Flex align="center" ml={3}>
            <Avatar 
              size="sm" 
              name={userInfo.name} 
              src={process.env.PUBLIC_URL + `/images/${userInfo.image}`} 
              backgroundColor="#dde6f5d7" 
            />
            <Box ml={3}>
              <Text fontSize="lg" fontWeight="bold">{userInfo.name}</Text>
            </Box>
            <Icon as={IoMdSettings} boxSize={6} ml={4} cursor="pointer" />
          </Flex>

          <Button 
            variant="ghost" 
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="full" 
          >
            <Icon as={AiOutlineLogout} boxSize={6} />
          </Button>
        </Flex>
        
        <Box p={4} mt={3}>
          <Flex borderRadius="lg" bg="white" p={4}>

          <Box flex="1" p={4}>
            <Flex justify="space-between" align="center">
              <Text fontSize="lg" fontWeight="bold">이용내역</Text>
              <Text fontSize="lg" fontWeight="bold">52회</Text>
            </Flex>
            <Flex justify="space-between" align="center" mt={4}> 
              <Text fontSize="lg" fontWeight="bold">나의 리뷰</Text>
              <Text fontSize="lg" fontWeight="bold">15개</Text>
            </Flex>
            <Flex justify="space-between" align="center" mt={4}> 
              <Text fontSize="lg" fontWeight="bold">사용 가능 쿠폰</Text>
              <Flex align="center">
                <Text fontSize="lg" fontWeight="bold">2장</Text>
                <Icon as={FiPlus} boxSize={5} ml={2} cursor="pointer" onClick={handleOpenModal} />
              </Flex>
            </Flex>
          </Box>

            <Divider orientation="vertical" height="140px" ml={3} mr={3} color="gray.100"/>

            <Box flex="1" p={4}>
              <Text fontSize="lg" fontWeight="bold" mb={5}>나의 서비스</Text>
              <Flex mt={2}  direction="row" align="center" justify="center" gap={7}>
                <Flex direction="column" align="center" cursor="pointer" onClick={navigateToSchedule}>
                  <Icon as={BsCalendar} boxSize="50px" mb={3} />
                  <Text fontSize="sm">일정 {">>"} </Text>
                </Flex>
                <Flex direction="column" align="center" cursor="pointer" onClick={navigateToChecklist} ml={6}>
                  <Icon as={BsCheckCircle} boxSize="50px" mb={3} /> 
                  <Text fontSize="sm">체크리스트 {">>"} </Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Box>

        <Box p={4} mt={4} bg="gray.100" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">가이드라인</Text>
          <Text mt={2}>여기에는 가이드라인에 대한 내용을 추가하세요.</Text>
        </Box>

        <CouponModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </Box>
    </>
  );
};

export default UserInfo;
