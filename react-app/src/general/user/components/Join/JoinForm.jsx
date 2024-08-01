import React from 'react';
import { InputGroup, Input, InputRightElement, Button, Select, FormControl, FormLabel, FormErrorMessage, Box } from '@chakra-ui/react';
import '../../components/Login/LoginForm.css';

// 비밀번호 입력 필드 컴포넌트
const PasswordInput = ({ placeholder, value, onChange, onBlur }) => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        <InputGroup size='md'>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
        </InputGroup>
    );
};

const JoinForm = ({ join }) => {
    const [username, setUsername] = React.useState('');
    const [emailDomain, setEmailDomain] = React.useState('');
    const [isUsernameAvailable, setIsUsernameAvailable] = React.useState(true);
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const onJoin = (e) => {
        e.preventDefault();

        // 비밀번호 확인
        if (password !== confirmPassword) {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        // 폼 데이터 추출
        const formData = new FormData(e.target);
        const username = formData.get('username')
        const name = formData.get('name');
        const email = `${formData.get('email')}@${emailDomain}`;
        const tel1 = formData.get('tel1');
        const tel2 = formData.get('tel2');
        const tel3 = formData.get('tel3');
        const image = formData.get('image');

        const tel = `${tel1}-${tel2}-${tel3}`;

        join({ username, password, name, email, tel, image });
    };

    const checkUsernameAvailability = () => {
        setIsUsernameAvailable(true);
    };

    return (
        <Box className="form" maxWidth="500px" mx="auto" p={6} bg="white" borderRadius="md" boxShadow="md">
            <h2 className="login-title" style={{ textAlign: 'center'}}>Join</h2>

            <form className="login-form" onSubmit={(e) => onJoin(e)}>
                <FormControl id="join-username" mb={4} isInvalid={!isUsernameAvailable} isRequired>
                    <FormLabel>Username</FormLabel>
                    <Box display="flex" alignItems="center">
                        <Input
                            type="text"
                            placeholder="Username"
                            name="username"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <Button
                            ml={3}
                            bg="#EDF2F7"
                            color={'black'}
                            onClick={checkUsernameAvailability}
                        >
                            <p>중복확인</p>
                        </Button>
                    </Box>
                    {!isUsernameAvailable && <FormErrorMessage>Username already taken.</FormErrorMessage>}
                </FormControl>

                <FormControl id="join-password" mb={4} isRequired>
                    <FormLabel>Password</FormLabel>
                    <PasswordInput
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>

                <FormControl id="join-confirm-password" mb={4} isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <PasswordInput
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                    />
                </FormControl>

                <FormControl id="join-email" mb={4} isRequired>
                    <FormLabel>Email</FormLabel>
                    <Box display="flex" alignItems="center">
                        <Input
                            type="text"
                            placeholder="Email"
                            name="email"
                            autoComplete="email"
                            required
                            mr={2}
                        />
                        @
                        <Select
                            name="emailDomain"
                            value={emailDomain}
                            onChange={(e) => setEmailDomain(e.target.value)}
                            ml={2}
                        >
                            <option value="gmail.com">gmail.com</option>
                            <option value="yahoo.com">yahoo.com</option>
                            <option value="hotmail.com">hotmail.com</option>
                            <option value="naver.com">naver.com</option>
                            <option value="daum.net">daum.net</option>
                        </Select>
                    </Box>
                </FormControl>

                <FormControl id="join-tel" mb={4} isRequired>
                    <FormLabel>Telephone</FormLabel>
                    <Box display="flex" gap={2}>
                        <Input
                            type="text"
                            placeholder="000"
                            name="tel1"
                            maxLength="3"
                            required
                        />
                        -
                        <Input
                            type="text"
                            placeholder="0000"
                            name="tel2"
                            maxLength="4"
                            required
                        />
                        -
                        <Input
                            type="text"
                            placeholder="0000"
                            name="tel3"
                            maxLength="4"
                            required
                        />
                    </Box>
                </FormControl>

                <FormControl id="join-profile-image" mb={4}>
                    <FormLabel>Profile Image</FormLabel>
                    <Input
                        type="file"
                        name="image"
                        accept="image/*"
                    />
                </FormControl>

                <Button className="btn btn--form btn-login" type="submit" colorScheme="teal" width="full">
                    Join
                </Button>
            </form>
        </Box>
    );
};

export default JoinForm;
