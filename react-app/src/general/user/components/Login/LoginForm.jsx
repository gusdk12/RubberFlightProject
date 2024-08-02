import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Checkbox, FormControl, FormLabel, HStack, Input, Stack, useToast, Text } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';

const LoginForm = () => {
  const { login } = useContext(LoginContext);
  const [rememberUserId, setRememberUserId] = useState('');
  const toast = useToast();

  const onLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const rememberId = e.target.rememberId.checked;

    login(username, password, rememberId)
      // .then(() => {
      //   toast({
      //     title: "Login successful.",
      //     description: "You have been logged in successfully.",
      //     status: "success",
      //     duration: 9000,
      //     isClosable: true,
      //   });
      // })
      // .catch((error) => {
      //   toast({
      //     title: "Login failed.",
      //     description: error.message,
      //     status: "error",
      //     duration: 9000,
      //     isClosable: true,
      //   });
      // });
  };

  useEffect(() => {
    // 쿠키에 저장된 username(아이디) 가져오기
    const rememberId = Cookies.get('rememberId');
    setRememberUserId(rememberId || '');
  }, []);

  return (
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
            />
          </FormControl>

          <FormControl>
            <Stack direction="row" align="center">
              <Checkbox id="remember-id" name="rememberId" defaultChecked={!!rememberUserId}>
                Remember me
              </Checkbox>
            </Stack>
          </FormControl>

          <HStack spacing={4} align="center" justify="right">
            {/* <Text fontSize={10}>아직 회원이 아니신가요?</Text> */}
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
  );
};

export default LoginForm;
