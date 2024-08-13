import React, { useEffect, useContext, useState } from 'react';
import MenuBar from '../../../general/common/SideMenu/MenuBar';
import { Box, Flex, Divider, Avatar, Text, IconButton, Tooltip, useToast } from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';
import { CopyIcon } from '@chakra-ui/icons'; 
import Header from '../../../general/common/Header/Header';
import { LoginContext } from '../../../general/user/contexts/LoginContextProvider';

const MyPage = () => {
  const { userInfo } = useContext(LoginContext);
  const toast = useToast(); 
  const navigate = useNavigate(); 
  const [isFirstVisit, setIsFirstVisit] = useState(true); 

  useEffect(() => {
    document.body.style.overflowY = 'scroll';
    document.body.style.backgroundColor = '#dde6f5d7';

    if (isFirstVisit) {
      navigate('/mypage/user-info'); 
      setIsFirstVisit(false); 
    }
  }, [navigate, isFirstVisit]);

  const handleCopyUsername = () => {
    navigator.clipboard.writeText(userInfo.username)
      .then(() => {
        toast({
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          render: () => (
            <Box
              color="white"
              p={3}
              mr={5}
              bg="#5685d2d2"
              borderRadius="md"
              boxShadow="md"
              fontSize="md"
              display="flex"
              alignItems="center" 
            >
              <CopyIcon boxSize={5} mr={4} />
              <Text size={2}>유저 이름이 복사되었습니다.</Text>
            </Box>
          ),
        });
      });
  };

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
            height: '120vh',
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
              <Tooltip label="복사하기" fontSize="md">
                <IconButton
                  aria-label="Copy Username"
                  border="none"
                  icon={<CopyIcon />}
                  ml={2}
                  onClick={handleCopyUsername}
                  size="lg"
                  variant="outline"
                />
              </Tooltip>
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

export default MyPage;
