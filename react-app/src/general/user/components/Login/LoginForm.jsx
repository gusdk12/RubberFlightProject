import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Checkbox, FormControl, FormLabel, HStack, Input, Stack, useToast, Text } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';
import './loginForm.module.css';

const LoginForm = () => {
  const { login } = useContext(LoginContext);
  const [rememberUserId, setRememberUserId] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const home = () => {
    navigate("/");
  }


  const onLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const rememberId = e.target.rememberId.checked;


    login(username, password, rememberId)
   
  };

  useEffect(() => {
    // 쿠키에 저장된 username(아이디) 가져오기
    const rememberId = Cookies.get('rememberId');
    setRememberUserId(rememberId || '');
    document.body.style.overflowY = 'scroll'; // 스크롤 허용
  }, []);

  return (
    <>
    <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 100
            }}
        >
            <div
                style={{
                backgroundImage: 'url(/images/icons/commercial-plane.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                width: '75px',
                height: '75px',
                cursor: 'pointer'
                }}
                onClick={home}
            ></div>
            </div>
    <Box maxWidth="400px" mx="auto" p={6} bg="white" borderRadius="md" boxShadow="md">
      <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: 30}}>Login</h2>

      <form onSubmit={(e) => onLogin(e)}>
        <Stack spacing={4}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Username"
              name="username"
              autoComplete="off"
              defaultValue={rememberUserId}
              backgroundColor={'white'}
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="off"
              backgroundColor={'white'}
              color={'black'}
              fontFamily="system-ui, sans-serif"
            />
          </FormControl>

          <FormControl>
            <Stack direction="row" align="center">
              <Checkbox id="remember-id" name="rememberId" defaultChecked={!!rememberUserId}>
                Remember me
              </Checkbox>
            </Stack>
          </FormControl>
            <hr/>
          <div>
            <h4 style={
              {
                fontWeight: '500'
              }
            }>Log in using your account on ></h4>
          </div>
          {/* 로그인 버튼 목록 */}
          <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            
          }}>

             {/* 구글 */}
         <div className='google'
          style={{
            // url('../../../assets/images/main/cloud.webp');
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '50px', // 이미지의 너비
            height: '50px', // 이미지의 높이
            cursor: 'pointer',
          }}
          onClick={() => {
            window.location.href = "http://localhost:8282/oauth2/authorization/google";
          }}
        />

            {/* 카카오 */}
            <div className='kakao'
              style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '50px', // 이미지의 너비
                height: '50px', // 이미지의 높이
                cursor: 'pointer',
              }}
              onClick={() => {
                // 클릭 시 이동할 URL을 여기서 설정
                window.location.href = "http://localhost:8282/oauth2/authorization/kakao";
              }}
            />

             {/* 네이버 */}
          <div className='naver'
          style={{
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '50px', // 이미지의 너비
            height: '50px', // 이미지의 높이
            cursor: 'pointer',
          }}
          onClick={() => {
            // 클릭 시 이동할 URL을 여기서 설정
            window.location.href = "http://localhost:8282/oauth2/authorization/naver";
          }}
        />


          {/* 페이스북 */}
          <div className='facebook'
          style={{
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '50px', // 이미지의 너비
            height: '50px', // 이미지의 높이
            cursor: 'pointer',
          }}
          onClick={() => {
            // 클릭 시 이동할 URL을 여기서 설정
            window.location.href = "http://localhost:8282/oauth2/authorization/facebook";
          }}
        />
        </div>
      

          <HStack spacing={4} align="center" justify="right">
            <Button as={Link} to="/selectJoin" variant="link" color={'#586D92'}>
            Join
            </Button>
            <Button type="submit" bg={'#586D92'} color={'white'}>
              Login
            </Button>
          </HStack>
        </Stack>
      </form>
    </Box>
    </>
  );
};

export default LoginForm;
