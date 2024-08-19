import React, { useContext, useState, useEffect } from 'react';
import { Box, Flex, Divider, Avatar, Text, Button, Icon, Circle } from '@chakra-ui/react';
import { LoginContext } from '../../../general/user/contexts/LoginContextProvider';
import { FiPlus } from 'react-icons/fi';
import { IoMdSettings } from 'react-icons/io'; 
import { AiOutlineLogout } from 'react-icons/ai';
import { BsCalendar, BsCheckCircle } from 'react-icons/bs';
import CouponModal from './CouponModal';
import { useNavigate } from 'react-router-dom';
import UserInfoModal from './UserInfoModal';
import Swal from 'sweetalert2';
import { FaPlane, FaCalendarAlt, FaClipboardCheck, FaThumbsUp } from "react-icons/fa";


const UserInfo = () => {
  const { isLogin, logout } = useContext(LoginContext);
  const { userInfo } = useContext(LoginContext); 
  const [isCouponModalOpen, setCouponModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tel: '',
    image: null,
    existingImage: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.id) {
      const fetchUserEmail = async () => {
        try {
          const response = await fetch(`http://localhost:8282/mypage/${userInfo.id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();  
          setFormData(prevData => ({
            ...prevData,
            name: data.name || '',
            email: data.email || '',
            tel: data.tel || '',
            existingImage: data.image || ''
          }));
        } catch (error) {
          console.error('유저 이메일 정보를 가져오는 데 실패했습니다:', error);
        }
      };

      fetchUserEmail();  
    }
  }, [userInfo.id]);

  const handleOpenCouponModal = () => {
    setCouponModalOpen(true);
  };

  const handleCloseCouponModal = () => {
    setCouponModalOpen(false);
  };

  const handleOpenInfoModal = () => {
    setInfoModalOpen(true);
  };

  const handleCloseInfoModal = () => {
    setInfoModalOpen(false);
  };

  const navigateToSchedule = () => {
    navigate('/schedule');
  };

  const navigateToChecklist = () => {
    navigate('/schedule')
  };

  const handleLogout = async () => {
    try {
      await logout(true);

      Swal.fire({
        title: '로그아웃되었습니다.',
        text: '메인화면으로 이동합니다.',
        icon: 'success',
        confirmButtonText: '확인',
        backdrop: true,
        position: 'center',
        customClass: {
          container: 'swal-container'
        },
        didOpen: () => {
          document.querySelector('.swal2-container').style.zIndex = 9999;
        }
      }).then(() => {
        navigate("/"); 
      });

    } catch (error) {
      console.error('로그아웃 처리 중 오류 발생:', error);
    }
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
              name={formData.name || '이름 없음'} 
              src={formData.existingImage} 
            />
            <Box ml={3} display="flex" flexDirection="column" alignItems="flex-start"> 
              <Flex alignItems="center">
                <Text fontSize="lg" fontWeight="bold">{formData.name || '이름 없음'}</Text>
                <Icon as={IoMdSettings} boxSize={6} ml={2} cursor="pointer" onClick={handleOpenInfoModal}/> 
              </Flex>
              <Text fontSize="small" mt={1}>{formData.email || '이메일 없음'}</Text> 
            </Box>
          </Flex>

          <Button
            variant="ghost"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="full"
          >
            <Icon as={AiOutlineLogout} boxSize={6} onClick={logout}  />
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
                  <Icon as={FiPlus} boxSize={5} ml={2} cursor="pointer" onClick={handleOpenCouponModal} />
                </Flex>
              </Flex>
            </Box>

            <Divider orientation="vertical" height="140px" ml={3} mr={3} color="gray.100"/>

            <Box flex="1" p={4}>
              <Text fontSize="lg" fontWeight="bold" mb={5}>나의 서비스 {">>"}</Text>
              <Flex mt={2} direction="row" align="center" justify="center" gap={7}>
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

        <Box p={8} mt={4} bg="gray.100" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">가이드라인 {">>"}</Text>
          <Text mt={1}>러버플라이트 적극적으로 활용하기</Text>


          <Flex mt={8} align="center" justify="center" position="relative" gap={0}>

       
        <Divider orientation="horizontal" borderColor="gray.300" position="absolute" top="38%" left="5%" right="5%" width="90%" />

     
        <Flex direction="column" align="center" position="relative" zIndex={1} mx={10} onClick={() => navigate("/search")} cursor="pointer">
          <Circle size="80px" bg="gray.200">
            <Icon as={FaPlane} boxSize={8} />
          </Circle>
          <Text mt={2}>예약하기</Text>
        </Flex>

        <Flex direction="column" align="center" position="relative" zIndex={1} mx={7} onClick={() => navigate("/schedule")} cursor="pointer">
          <Circle size="80px" bg="gray.200">
            <Icon as={FaCalendarAlt} boxSize={8} />
          </Circle>
          <Text mt={2}>일정작성</Text>
        </Flex>

        <Flex direction="column" align="center" position="relative" zIndex={1} mx={7} onClick={() => navigate("/schedule")} cursor="pointer">
          <Circle size="80px" bg="gray.200">
            <Icon as={FaClipboardCheck} boxSize={8} />
          </Circle>
          <Text mt={2}>체크리스트 작성</Text>
        </Flex>

        <Flex direction="column" align="center" position="relative" zIndex={1} mx={7} onClick={() => navigate("/review")} cursor="pointer">
          <Circle size="80px" bg="gray.200">
            <Icon as={FaThumbsUp} boxSize={8} />
          </Circle>
          <Text mt={2}>리뷰작성</Text>
        </Flex>
      </Flex>
        </Box>

        <CouponModal isOpen={isCouponModalOpen} onClose={handleCloseCouponModal} />
        <UserInfoModal 
          isOpen={isInfoModalOpen} 
          onClose={handleCloseInfoModal}
        />
      </Box>
    </>
  );
};

export default UserInfo;