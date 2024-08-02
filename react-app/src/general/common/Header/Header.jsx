import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, ButtonGroup, CheckboxIcon, Flex, Heading, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Spacer, background } from '@chakra-ui/react';
import { LoginContext } from '../../user/contexts/LoginContextProvider';
import '../CSS/Header.css';
import { CheckIcon, CloseIcon, HamburgerIcon, StarIcon, ViewIcon } from '@chakra-ui/icons';

const Header = () => {
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


  return (
    <>
      <div className={`HeaderContainer ${isScrolled ? 'scrolled' : ''}`}>
      <Flex minWidth='max-content' alignItems='space-between'>
        <Box>
          <Heading paddingLeft={'30px'} color="#364042" size='lg' position={"relative"} zIndex={3}>
            임시홈
          </Heading>
        </Box>
        <Spacer />
        <ButtonGroup>
          {!isLogin ? (
            <>
            <Button as={Link} 
              to="/login" color="#5B6D92" fontWeight="bold"
              fontSize="lg" bg="#ffffff0" variant="solid">
              Login
            </Button>
            </>
          ) : (
            <>
              <Menu>
                <MenuButton as={IconButton} icon={<ViewIcon />} 
                  variant='filled'
                  aria-label='Options'
                  colorScheme='white'
                  fontSize='30px'>
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<StarIcon />}>
                    마이페이지
                  </MenuItem>
                  <MenuItem icon={<CloseIcon />} onClick={() => logout()}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
              {/* <IconButton
                variant=''
                colorScheme='#ffffff'
                aria-label='Call Sage'
                fontSize='30px'
                icon={<HamburgerIcon />}/> */}
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
              {/* <Button onClick={() => logout()}
                color="#5B6D92" fontWeight="bold"
                fontSize="lg" bg="#ffffff0" variant="solid">
                Logout
              </Button> */}
            </>
          )}
        </ButtonGroup>
      </Flex>
    </div>
    </>
  );
};

export default Header;
