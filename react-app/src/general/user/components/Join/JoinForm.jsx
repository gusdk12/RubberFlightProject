import React from 'react';
import { InputGroup, Input, InputRightElement, Button, Select, FormControl, FormLabel, Box } from '@chakra-ui/react';
import api from '../../../../apis/api'; // api 인스턴스 경로

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
    const onJoin = async (e) => {
        e.preventDefault();

        // FormData 객체 생성
        const formData = new FormData(e.target);

        // tel1, tel2, tel3 필드를 하나로 결합
        const tel1 = formData.get('tel1');
        const tel2 = formData.get('tel2');
        const tel3 = formData.get('tel3');
        const tel = `${tel1}-${tel2}-${tel3}`;
        
        // 결합된 tel을 FormData에 추가 (기존 tel1, tel2, tel3 제거)
        formData.delete('tel1');
        formData.delete('tel2');
        formData.delete('tel3');
        formData.append('tel', tel);

        // 데이터 확인
        console.log(
            formData.get('username'),
            formData.get('password'),
            formData.get('name'),
            formData.get('email') + '@' + formData.get('emailDomain'),
            formData.get('tel'),
            formData.get('file') // file이 올바르게 업로드되는지 확인
        );

        // join 함수 호출
        try {
            await join(formData); // 파일 업로드와 함께 전송
            console.log('Join request successful');
        } catch (error) {
            console.error('Join request failed:', error);
        }

        // 폼 리셋 (선택 사항)
        e.target.reset();

    
    };

    return (
        <Box className="form" maxWidth="500px" mx="auto" p={6} bg="white" borderRadius="md" boxShadow="md">
            <h2 className="login-title" style={{ textAlign: 'center' }}>Join</h2>

            <form className="login-form" onSubmit={onJoin}>
                {/* Form fields */}
                <FormControl id="join-username" mb={4} isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        placeholder="Username"
                        name="username"
                        autoComplete="username"
                        required
                    />
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
                            defaultValue="gmail.com"
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
                        name="file"
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
