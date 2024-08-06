import React from 'react';
import { InputGroup, Input, InputRightElement, Button, Select, FormControl, FormLabel, Box, Flex, Text } from '@chakra-ui/react';
import CustomFileInput from '../Join/CustomFileInput';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
                backgroundColor={'white'}
                fontFamily={show ? 'inherit' : 'system-ui, sans-serif'}
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
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [emailDomain, setEmailDomain] = React.useState('naver.com');
    const [tel1, setTel1] = React.useState('');
    const [tel2, setTel2] = React.useState('');
    const [tel3, setTel3] = React.useState('');
    const navigate = useNavigate(); 


    // 사용자 이름 입력값 변경 핸들러
    const handleUsernameChange = (e) => setUsername(e.target.value);

    // 비밀번호 입력값 변경 핸들러
    const handlePasswordChange = (e) => setPassword(e.target.value);

    // 비밀번호 확인 입력값 변경 핸들러
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    // 이름 입력값 변경 핸들러
    const handleNameChange = (e) => setName(e.target.value);

    // 이메일 입력값 변경 핸들러
    const handleEmailChange = (e) => setEmail(e.target.value);

    // 이메일 도메인 변경 핸들러
    const handleEmailDomainChange = (e) => setEmailDomain(e.target.value);

    // 전화번호 입력값 변경 핸들러
    const handleTel1Change = (e) => setTel1(e.target.value);
    const handleTel2Change = (e) => setTel2(e.target.value);
    const handleTel3Change = (e) => setTel3(e.target.value);


    // 사용자 이름 중복 확인
    const checkUsername = async () => {
        if (!username) {
            Swal.fire({
                icon: 'error',
                title: '아이디 입력 필요',
                text: '아이디를 입력해 주세요.',
            });
            return;
        }

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

        // 유효성 검사
        if (!username) {
            Swal.fire({
                icon: 'error',
                title: '아이디를 입력하지 않았습니다.',
                text: '올바르게 아이디를 작성하신 후 회원 가입을 진행해주세요.',
            });
            return;
        }

        if (!password) {
            Swal.fire({
                icon: 'error',
                title: '비밀번호를 입력하지 않았습니다.',
                text: '올바르게 비밀번호를 작성하신 후 회원 가입을 진행해주세요.',
            });
            return;
        }

        if (!confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: '비밀번호 확인을 입력하지 않았습니다.',
                text: '올바르게 비밀번호 확인을 작성하신 후 회원 가입을 진행해주세요.',
            });
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: '비밀번호가 일치하지 않습니다.',
                text: '올바르게 작성하신 후 회원 가입을 진행해주세요.',
            });
            return;
        }

        if (!name) {
            Swal.fire({
                icon: 'error',
                title: '이름을 입력하지 않았습니다.',
                text: '올바르게 이름을 작성하신 후 회원 가입을 진행해주세요.',
            });
            return;
        }

        if (!email) {
            Swal.fire({
                icon: 'error',
                title: '이메일을 입력하지 않았습니다.',
                text: '올바르게 이메일을 작성하신 후 회원 가입을 진행해주세요.',
            });
            return;
        }

        if (!emailDomain) {
            Swal.fire({
                icon: 'error',
                title: '이메일 도메인 선택 필요',
                text: '이메일 도메인을 선택해 주세요.',
            });
            return;
        }

        if (!tel1 || !tel2 || !tel3) {
            Swal.fire({
                icon: 'error',
                title: '전화번호를 입력하지 않았습니다.',
                text: '올바르게 전화번호를 작성하신 후 회원 가입을 진행해주세요.',
            });
            return;
        }

        // 이메일 주소 합치기
        const fullEmail = `${email}@${emailDomain}`;

        // 이메일 주소 유효성 검사
        if (!/\S+@\S+\.\S+/.test(fullEmail)) {
            Swal.fire({
                icon: 'error',
                title: '이메일 형식 오류',
                text: '유효한 이메일 주소를 입력해 주세요.',
            });
            return;
        }

        // 전화번호 유효성 검사
        const fullTel = `${tel1}-${tel2}-${tel3}`;
        if (!/^\d{3}-\d{4}-\d{4}$/.test(fullTel)) {
            Swal.fire({
                icon: 'error',
                title: '전화번호 형식 오류',
                text: '전화번호를 올바른 형식으로 입력해 주세요.',
            });
            return;
        }

        // 폼 데이터 준비
        const formData = new FormData(e.target);

        // 이메일 주소와 도메인 삭제
        formData.delete('email');
        formData.delete('emailDomain');
        
        // 통합된 이메일 주소 추가
        formData.append('email', fullEmail);

        // 전화번호 필드 삭제 후 통합된 전화번호 추가
        formData.delete('tel1');
        formData.delete('tel2');
        formData.delete('tel3');
        formData.append('tel', fullTel);

        try {
            await join(formData);
            Swal.fire({
                icon: 'success',
                title: '회원가입 성공',
                text: '메인페이지로 이동합니다.',
            });
        } catch (error) {
            console.error('Join request failed:', error);
            Swal.fire({
                icon: 'error',
                title: '회원가입 실패',
                text: '잠시후 다시 시도해주세요.',
            });
        }

        e.target.reset();
    };

    const home = () => {
        navigate("/");
    }

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
      <div className='homeBtn'
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
        <Box className="form" maxWidth="480px" mx="auto" p={6} bg="#ffffff" borderRadius="md" boxShadow="md" padding={10}>
            <h2 className="login-title" style={{ textAlign: 'center', fontSize: '40px' }}>Join</h2>

            <form className="login-form" onSubmit={onJoin}>
                <FormControl id="join-username" mb={4}>
                    <FormLabel>Username <Text as="span" color="red">*</Text></FormLabel>
                    <Flex>
                        <Input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={handleUsernameChange}
                            autoComplete="username"
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
                <FormControl id="join-password" mb={4}>
                    <FormLabel>Password <Text as="span" color="red">*</Text></FormLabel>
                    <PasswordInput
                        placeholder="Enter password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </FormControl>

                <FormControl id="join-confirm-password" mb={4}>
                    <FormLabel>Confirm Password <Text as="span" color="red">*</Text></FormLabel>
                    <PasswordInput
                        placeholder="Confirm password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </FormControl>

                <FormControl id="join-name" mb={4}>
                    <FormLabel>Name <Text as="span" color="red">*</Text></FormLabel>
                    <Input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                        autoComplete="name"
                        backgroundColor={'white'}
                    />
                </FormControl>

                <FormControl id="join-email-section" mb={4}>
                    <FormLabel>Email <Text as="span" color="red">*</Text></FormLabel>
                    <Box display="flex" alignItems="center">
                        <Input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            autoComplete="email"
                            mr={2}
                            backgroundColor={'white'}
                            id="join-email-input"
                        />
                        @
                        <Select
                            name="emailDomain"
                            value={emailDomain}
                            onChange={handleEmailDomainChange}
                            ml={2}
                            backgroundColor={'white'}
                            id="join-email-domain"
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

                <FormControl id="join-tel-section" mb={4}>
                    <FormLabel>Phone <Text as="span" color="red">*</Text></FormLabel>
                    <Flex>
                        <Input
                            type="text"
                            placeholder=""
                            name="tel1"
                            value={tel1}
                            onChange={handleTel1Change}
                            maxLength="3"
                            backgroundColor={'white'}
                            id="join-tel1"
                        />
                        -
                        <Input
                            type="text"
                            placeholder=""
                            name="tel2"
                            value={tel2}
                            onChange={handleTel2Change}
                            maxLength="4"
                            ml={2}
                            backgroundColor={'white'}
                            id="join-tel2"
                        />
                        -
                        <Input
                            type="text"
                            placeholder=""
                            name="tel3"
                            value={tel3}
                            onChange={handleTel3Change}
                            maxLength="4"
                            ml={2}
                            backgroundColor={'white'}
                            id="join-tel3"
                        />
                    </Flex>
                </FormControl>

                <FormControl id="join-profile-image" mb={4}>
                    <FormLabel>Profile Image</FormLabel>
                    <CustomFileInput
                        name="file"
                        accept="image/*"
                    />
                </FormControl>
                <br/>

                <Button
                    type="submit"
                    bg="#586D92"
                    color="white"
                    width={'100%'}
                    _hover={{ bg: "#4a5b71" }}
                    _active={{ bg: "#586D92" }}
                >
                    Sign Up
                </Button>
            </form>
        </Box>
        </>
    );
};

export default JoinForm;
