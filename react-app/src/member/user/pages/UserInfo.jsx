import React, { useContext, useState, useEffect } from 'react';
import { Box, Flex, Divider, Avatar, Text, Button, Icon } from '@chakra-ui/react';
import { LoginContext } from '../../../general/user/contexts/LoginContextProvider';
import { FiPlus } from 'react-icons/fi';
import { IoMdSettings } from 'react-icons/io'; 
import { AiOutlineLogout } from 'react-icons/ai';
import { BsCalendar, BsCheckCircle } from 'react-icons/bs';
import CouponModal from './CouponModal';
import { useNavigate } from 'react-router-dom';
import UserInfoModal from './UserInfoModal';

const UserInfo = () => {
  const { userInfo } = useContext(LoginContext); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [email, setEmail] = useState('');  // 이메일 상태 추가
  const navigate = useNavigate();
  const backUrl = process.env.REACT_APP_BACK_URL;

  useEffect(() => {
    if (userInfo.id) {
      const fetchUserEmail = async () => {
        try {
          const response = await fetch(`${backUrl}/mypage/${userInfo.id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();  // 데이터를 JSON으로 파싱
          setEmail(data.email || '');  // 이메일 상태 업데이트
        } catch (error) {
          console.error('유저 이메일 정보를 가져오는 데 실패했습니다:', error);
        }
      };

      fetchUserEmail();  // 이메일 데이터 가져오기
    }
  }, [userInfo.id]);

  const handleOpenModal = () => {
    setModalOpen(true); 
  };

  const handleCloseModal = () => {
    setModalOpen(false); 
  };

  const userInfoModalOpen = () => {
    setInfoModalOpen(true);
  };

  const userInfoModalClose = () => {
    setInfoModalOpen(false);
  };

  const navigateToSchedule = () => {
    navigate('/schedule');
  };

  const navigateToChecklist = () => {};

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
            <Box ml={3} display="flex" flexDirection="column" alignItems="flex-start"> {/* 이름과 이메일을 세로로 정렬 */}
              <Flex alignItems="center">
                <Text fontSize="lg" fontWeight="bold">{userInfo.name}</Text>
                <Icon as={IoMdSettings} boxSize={6} ml={2} cursor="pointer" onClick={userInfoModalOpen}/> {/* 톱니바퀴 아이콘 */}
              </Flex>
              <Text fontSize="xx-small" mt={1}>{email}</Text> {/* 이름 아래에 이메일 정보 */}
            </Box>
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
        <UserInfoModal 
          isOpen={isInfoModalOpen} 
          onClose={userInfoModalClose}
          userInfo={userInfo} // 이메일 정보를 포함한 userInfo 전달
        />
      </Box>
    </>
  );
};

export default UserInfo;
