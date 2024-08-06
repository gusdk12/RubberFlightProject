import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, ButtonGroup, CheckboxIcon, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Spacer, VStack, background, useDisclosure } from '@chakra-ui/react';
import { LoginContext } from '../../user/contexts/LoginContextProvider';
import '../CSS/Header.css';
import { CloseIcon, HamburgerIcon, StarIcon, ViewIcon } from '@chakra-ui/icons';


const CustomIcon = () => {
  return <Image src="/images/icons/navigation.png" boxSize="60px"objectFit='contain' />;
};

const Header = ({isMain}) => {
  const { isLogin, logout, userInfo, roles } = useContext(LoginContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const handleScroll = () => {
    if (window.scrollY > 70) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigate = useNavigate();
  const myPage= () => {
    navigate('/mypage')
  }

  const adminPage = () => {
    navigate('/admin/edit')
  }

  const couponPage = () => {
    navigate('/coupon')
  }


  const schedulePage= () => {
    navigate('/schedule')
  }

  const liveFlight = () => {
    navigate('/live')
  }
  
  const backgroundImageUrl = process.env.PUBLIC_URL + '/images/icons/commercial-plane.png';

  return (
    <>
      <div className={`HeaderContainer ${isMain ? 'HeaderAbsolute' : '' } ${isScrolled ? 'scrolled' : ''}`}>
      <Flex minWidth='max-content' alignItems='space-between'>
        <div
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover', // 배경 이미지 크기 조정
            backgroundPosition: 'center', // 배경 이미지 위치 조정
            width: '75px',
            height: '75px'
        }}/>

        <Spacer />
        <ButtonGroup>
        <Box>
              <Button ref={btnRef} onClick={onOpen} as={IconButton} icon={<CustomIcon />}
                  isRound={true}
                  variant='solid'
                  aria-label='Options'
                  bg='#FBFFFF'
                  boxShadow='md'
                  width="53px"
                  height="53px"
                  borderRadius="50%"
                  pointerEvents={"all"}>
              </Button>
              <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
              >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>메뉴</DrawerHeader>
                <DrawerBody>
                  <VStack spacing={2} align="stretch">
                    {isLogin ? (
                          <>
                            {roles.isAdmin && (
                              <>
                                <Button variant="outline" onClick={adminPage}>나라 및 공항 관리</Button>
                                <Button variant="outline" onClick={couponPage}>쿠폰 관리</Button>
                              </>
                            )}
                            {roles.isMember && (
                              <>
                                <Button variant="outline" onClick={myPage}>마이페이지</Button>
                                <Button variant="outline" onClick={schedulePage}>일정짜기</Button>
                              </>
                            )}
                            <Divider my={5}/>
                          </>
                        )
                        :
                        (<></>)}
                    <Button variant="outline">항공권 검색</Button>
                    <Button variant="outline" onClick={liveFlight}>비행기 실시간 추척</Button>
                    <Button variant="outline">항공사 리뷰</Button>
                  </VStack>
                </DrawerBody>
      
                <DrawerFooter>
                {!isLogin ? (
                      <><Button as={Link} 
                          to="/login" bg='#6b8aef' width="100%" color={'#ffffff'}>
                        로그인
                      </Button></>
                    )
                    :
                    (
                      <><Button onClick={() => logout()} bg='#6b8aef' width="100%" color={'#ffffff'}>
                        로그아웃
                      </Button></>
                    )}
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            </Box>
        </ButtonGroup>
      </Flex>
    </div>
    </>
  );
};

export default Header;
