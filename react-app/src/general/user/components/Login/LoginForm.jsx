import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Checkbox, FormControl, FormLabel, HStack, Input, Stack, useToast, Flex } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';
import styles from './loginForm.module.css';

const LoginForm = () => {
  const { login } = useContext(LoginContext);
  const [rememberUserId, setRememberUserId] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const backUrl = process.env.REACT_APP_BACK_URL;

  const home = () => {
    navigate("/");
  }

  const onLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const rememberId = e.target.rememberId.checked;

    login(username, password, rememberId);
  };

  useEffect(() => {
    const rememberId = Cookies.get('rememberId');
    setRememberUserId(rememberId || '');
    document.body.style.overflowY = 'scroll';
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={4}
      backgroundColor="red"
    >
      <Box
        height="10vh"
      ></Box>
      {/* 로그인 텍스트 */}
      <Box mb={2} textAlign="center">
        <h1 style={{ fontSize: '27px', fontWeight: 'bold' }}>Login</h1>
      </Box>

        {/* 오른쪽 로그인 폼 영역 */}
        <Box flex="1" p={4}>
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
                  className={styles.inputCustom}
                />
              </FormControl>

              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  autoComplete="off"
                  className={styles.inputCustom}
                />
              </FormControl>

              <FormControl>
                <Stack direction="row" align="center">
                  <Checkbox id="remember-id" name="rememberId" defaultChecked={!!rememberUserId}>
                    Remember me
                  </Checkbox>
                </Stack>
              </FormControl>

              <hr />
              <div>
                <h4 style={{ fontWeight: '500' }}>Log in using your account on</h4>
              </div>

              {/* 소셜 로그인 버튼 부분 */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 20,
                }}
              >
                {/* 구글 로그인 */}
                <div className={styles.google}
                  style={{
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '50px',
                    height: '50px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    window.location.href = `${backUrl}/authorization/google`;
                  }}
                />

                {/* 카카오 로그인 */}
                <div className={styles.kakao}
                  style={{
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '50px',
                    height: '50px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    window.location.href = `${backUrl}/oauth2/authorization/kakao`;
                  }}
                />

                {/* 네이버 로그인 */}
                <div className={styles.naver}
                  style={{
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '50px',
                    height: '50px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    window.location.href = `${backUrl}/oauth2/authorization/naver`;
                  }}
                />

                {/* 페이스북 로그인 */}
                <div className={styles.facebook}
                  style={{
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '50px',
                    height: '50px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    window.location.href = `${backUrl}/oauth2/authorization/facebook`;
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
    </Box>
  );
};

export default LoginForm;
