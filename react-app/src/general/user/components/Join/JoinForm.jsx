import React from 'react';
import { InputGroup, Input, InputRightElement, Button, Select, FormControl, FormLabel, Box, Flex } from '@chakra-ui/react';
import CustomFileInput from '../Join/CustomFileInput';
import Swal from 'sweetalert2';
import axios from 'axios';

// 비밀번호 입력 필드 컴포넌트
const PasswordInput = ({ placeholder, name, value, onChange, onBlur }) => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        <InputGroup size='md'>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required
                backgroundColor={'white'}
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick} bg={'#586D92'} color={'white'}>
                    {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
        </InputGroup>
    );
};

const JoinForm = ({ join }) => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [emailDomain, setEmailDomain] = React.useState('gmail.com');

    // 사용자 이름 입력값 변경 핸들러
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    // 이메일 입력값 변경 핸들러
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // 이메일 도메인 변경 핸들러
    const handleEmailDomainChange = (e) => {
        setEmailDomain(e.target.value);
    };

    // 사용자 이름 중복 확인
    const checkUsername = async () => {
        try {
            const response = await axios.post('http://localhost:8282/user/check-username', { username });
            if (response.data.exists) {
                Swal.fire({
                    icon: 'error',
                    title: '중복된 아이디입니다.',
                    text: '다른 아이디를 사용해주세요.',
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: '사용가능한 아이디입니다.',
                    text: '회원가입을 진행해주세요.',
                });
            }
        } catch (error) {
            console.error('Error checking username:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while checking the username.',
            });
        }
    };

    // 폼 제출 핸들러
    const onJoin = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const tel1 = formData.get('tel1');
        const tel2 = formData.get('tel2');
        const tel3 = formData.get('tel3');
        const tel = `${tel1}-${tel2}-${tel3}`;

        formData.delete('tel1');
        formData.delete('tel2');
        formData.delete('tel3');
        formData.append('tel', tel);

        // 이메일 주소 합치기
        const fullEmail = `${email}@${emailDomain}`;
        formData.delete('email');
        formData.delete('emailDomain');
        formData.append('email', fullEmail);

        try {
            await join(formData);
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                text: 'You have successfully registered.',
            });
        } catch (error) {
            console.error('Join request failed:', error);
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'There was an error while registering. Please try again.',
            });
        }

        e.target.reset();
    };

    return (
        <Box className="form" maxWidth="500px" mx="auto" p={6} bg="#e6eaf4" borderRadius="md" boxShadow="md">
            <h2 className="login-title" style={{ textAlign: 'center', fontSize: '40px' }}>Join</h2>

            <form className="login-form" onSubmit={onJoin}>
                <FormControl id="join-username" mb={4} isRequired>
                    <FormLabel>Username</FormLabel>
                    <Flex>
                        <Input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={handleUsernameChange}
                            autoComplete="username"
                            required
                            backgroundColor={'white'}
                        />
                        <Button
                            ml={2}
                            bg="#ed8585"
                            color="white"
                            _hover={{ bg: "#f59e9e" }} // Hover 시 색상
                            _active={{ bg: "#ed8585" }} // 클릭 시 색상
                            onClick={checkUsername}
                        >
                            중복 확인
                        </Button>
                    </Flex>
                </FormControl>

                <FormControl id="join-password" mb={4} isRequired>
                    <FormLabel>Password</FormLabel>
                    <PasswordInput
                        placeholder="Enter password"
                        name="password"
                        required
                    />
                </FormControl>

                <FormControl id="join-confirm-password" mb={4} isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <PasswordInput
                        placeholder="Confirm password"
                        name="confirmPassword"
                        required
                    />
                </FormControl>

                <FormControl id="join-name" mb={4} isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        placeholder="Name"
                        name="name"
                        autoComplete="name"
                        required
                        backgroundColor={'white'}
                    />
                </FormControl>

                <FormControl id="join-email" mb={4} isRequired>
                    <FormLabel>Email</FormLabel>
                    <Box display="flex" alignItems="center">
                        <Input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            autoComplete="email"
                            required
                            mr={2}
                            backgroundColor={'white'}
                        />
                        @
                        <Select
                            name="emailDomain"
                            value={emailDomain}
                            onChange={handleEmailDomainChange}
                            ml={2}
                            backgroundColor={'white'}
                        >
                            <option value="naver.com">naver.com</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="hanmail.net">hanmail.net</option>
                            <option value="nate.com">nate.com</option>
                            <option value="yahoo.com">yahoo.com</option>
                            <option value="hotmail.com">hotmail.com</option>
                            <option value="daum.net">daum.net</option>
                        </Select>
                    </Box>
                </FormControl>

                <FormControl id="join-tel" mb={4} isRequired>
                    <FormLabel>Telephone</FormLabel>
                    <Box display="flex" gap={2}>
                        <Input
                            type="text"
                            placeholder=""
                            name="tel1"
                            maxLength="3"
                            required
                            backgroundColor={'white'}
                        />
                        -
                        <Input
                            type="text"
                            placeholder=""
                            name="tel2"
                            maxLength="4"
                            required
                            backgroundColor={'white'}
                        />
                        -
                        <Input
                            type="text"
                            placeholder=""
                            name="tel3"
                            maxLength="4"
                            required
                            backgroundColor={'white'}
                        />
                    </Box>
                </FormControl>

                <FormControl id="join-profile-image" mb={4}>
                    <FormLabel>Profile Image</FormLabel>
                    <CustomFileInput
                        name="file"
                        accept="image/*"
                    />
                </FormControl>

                <Button className="btn btn--form btn-login" type="submit" bg="#586D92" color={'white'} width="full">
                    Join
                </Button>
            </form>
        </Box>
    );
};

export default JoinForm;
