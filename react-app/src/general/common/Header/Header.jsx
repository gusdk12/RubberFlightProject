import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, ButtonGroup, CheckboxIcon, Flex, Heading, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Spacer, background } from '@chakra-ui/react';
import { LoginContext } from '../../user/contexts/LoginContextProvider';
import '../CSS/Header.css';
import { CloseIcon, HamburgerIcon, StarIcon, ViewIcon } from '@chakra-ui/icons';


const CustomIcon = () => {
  return <Image src="/images/icons/navigation.png" boxSize="36px" />;
};

const Header = ({isMain}) => {
  const { isLogin, logout, userInfo } = useContext(LoginContext);
  const [isScrolled, setIsScrolled] = useState(false);

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
    navigate('/member/mypage')
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
          {!isLogin ? (
            <>
              <Menu>
                <MenuButton as={IconButton} icon={<CustomIcon />}
                  isRound={true}
                  variant='solid'
                  aria-label='Options'
                  bg='#FBFFFF'
                  size='lg'
                  boxShadow='md'
                  fontSize='50px'>
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} 
                      to="/login">
                    로그인
                  </MenuItem>
                  <MenuItem >
                    항공권 검색
                  </MenuItem>
                  <MenuItem >
                    비행기 실시간 추척
                  </MenuItem>
                  <MenuItem >
                    항공사 리뷰
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Menu>
                <MenuButton as={IconButton} icon={<CustomIcon />}
                  isRound={true}
                  variant='solid'
                  aria-label='Options'
                  bg='#FBFFFF'
                  size='lg'
                  boxShadow='md'
                  fontSize='50px'>
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<StarIcon />} onClick={myPage}>
                    마이페이지
                  </MenuItem>
                  <MenuItem icon={<CloseIcon />} onClick={() => logout()}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton as={IconButton} icon={<HamburgerIcon />} 
                  variant='filled'
                  aria-label='Options'
                  colorScheme='white'
                  fontSize='30px'>
                </MenuButton>
                <MenuList>
                  <MenuItem >
                    항공권 검색
                  </MenuItem>
                  <MenuItem >
                    비행기 실시간 추척
                  </MenuItem>
                  <MenuItem >
                    항공사 리뷰
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </ButtonGroup>
      </Flex>
    </div>
    </>
  );
};

export default Header;
