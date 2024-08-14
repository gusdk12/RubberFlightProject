import React, { useEffect, useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Button, Input, Text, Flex, FormControl,
  FormLabel, Image,
  Select,
  Box
} from '@chakra-ui/react';
import { useUser } from '../../../general/user/contexts/LoginContextProvider';
import Swal from 'sweetalert2';

const UserInfoModal = ({ isOpen, onClose }) => {
  const { userInfo, loginCheck } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    emailDomain: 'naver.com', // 기본 도메인 설정
    tel1: '',
    tel2: '',
    tel3: '',
    password: '',
    passwordCheck: '',
    image: null,
    existingImage: '' // 기존 이미지 URL
  });

  useEffect(() => {
    if (isOpen && userInfo.id) {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch(`http://localhost:8282/mypage/${userInfo.id}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const text = await response.text();
          const data = JSON.parse(text);

          setFormData({
            name: data.name || '',
            email: data.email ? data.email.split('@')[0] : '',
            emailDomain: data.email ? data.email.split('@')[1] : 'naver.com',
            tel1: data.tel ? data.tel.split('-')[0] : '',
            tel2: data.tel ? data.tel.split('-')[1] : '',
            tel3: data.tel ? data.tel.split('-')[2] : '',
            password: '',
            passwordCheck: '',
            image: null,
            existingImage: data.image || ''
          });
        } catch (error) {
          console.error('유저 정보를 가져오는 데 실패했습니다:', error);
        }
      };
      
      fetchUserInfo();
    }
  }, [isOpen, userInfo.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file
    }));
  };

  const handleSave = async () => {
    if (formData.password !== formData.passwordCheck) {
      console.error('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', `${formData.email}@${formData.emailDomain}`);
      formDataToSend.append('tel', `${formData.tel1}-${formData.tel2}-${formData.tel3}`);
      
      
      formDataToSend.append('password', formData.password || formData.existingPassword);
    
      
      if (formData.image) {
        formDataToSend.append('file', formData.image);
      } else if (formData.existingImage) {
        formDataToSend.append('existingImage', formData.existingImage);
      }

      const response = await fetch(`http://localhost:8282/mypage/update/${userInfo.id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      const responseText = await response.text();
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${responseText}`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('응답을 JSON으로 파싱하는 데 실패했습니다:', e);
        throw new Error('응답이 JSON 형식이 아닙니다.');
      }
      
      Swal.fire({
  title: "수정 완료",
  text: "회원정보를 성공적으로 수정하였습니다.",
  icon: "success",
  confirmButtonText: "확인",
  backdrop: true, // 배경 흐리기
  customClass: {
    container: 'swal-container' // 커스터마이즈할 CSS 클래스 (선택 사항)
  }
}).then(() => {
  window.location.reload(); // 페이지 새로 고침
});


      console.log(data);
      await loginCheck();
      onClose();
    } catch (error) {
      console.error('유저 정보 수정 실패:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent bg="#ffffff" borderRadius="md" boxShadow="lg">
        <ModalHeader fontSize="30px" fontWeight="bold">회원 정보 수정</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" p={4} maxWidth="500px" mx="auto">

          <FormControl id="profileImage" mb={4}>
              <FormLabel fontWeight="medium">프로필 사진:</FormLabel>
              {formData.existingImage && !formData.image && (
                <Image src={formData.existingImage} alt="Existing Profile" boxSize="100px" objectFit="cover" mb={2} />
              )}
              <Input type="file" onChange={handleFileChange} bg="white" />
              {formData.image && <Text mt={2}>현재 이미지: {formData.image.name}</Text>}
            </FormControl>

            <FormControl id="name" mb={4}>
              <FormLabel fontWeight="medium">이름:</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                bg="white"
              />
            </FormControl>
    
            <FormControl id="email" mb={4}>
              <FormLabel fontWeight="medium">Email:</FormLabel>
              <Box display="flex" alignItems="center">
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  bg="white"
                  borderColor="#d1d1d1"
                />
                @
                <Select
                  name="emailDomain"
                  value={formData.emailDomain}
                  onChange={handleChange}
                  bg="white"
                  borderColor="#d1d1d1"
                  ml={2}
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
    
            <FormControl id="tel" mb={4}>
              <FormLabel fontWeight="medium">전화번호:</FormLabel>
              <Flex>
                <Input
                  name="tel1"
                  value={formData.tel1}
                  onChange={handleChange}
                  maxLength="3"
                  bg="white"
                  borderColor="#d1d1d1"
                />
                -
                <Input
                  name="tel2"
                  value={formData.tel2}
                  onChange={handleChange}
                  maxLength="4"
                  bg="white"
                  borderColor="#d1d1d1"
                  ml={2}
                />
                -
                <Input
                  name="tel3"
                  value={formData.tel3}
                  onChange={handleChange}
                  maxLength="4"
                  bg="white"
                  borderColor="#d1d1d1"
                  ml={2}
                />
              </Flex>
            </FormControl>
    
            <FormControl id="password" mb={4}>
              <FormLabel fontWeight="medium">비밀번호:</FormLabel>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                bg="white"
              />
            </FormControl>
    
            <FormControl id="passwordCheck" mb={4}>
              <FormLabel fontWeight="medium">비밀번호 확인:</FormLabel>
              <Input
                name="passwordCheck"
                type="password"
                value={formData.passwordCheck}
                onChange={handleChange}
                bg="white"
              />
            </FormControl>
    
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            저장
          </Button>
          <Button variant="outline" onClick={onClose}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserInfoModal;