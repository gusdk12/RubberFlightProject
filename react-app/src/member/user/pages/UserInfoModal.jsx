import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Text } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useUser } from '../../../general/user/contexts/LoginContextProvider';

const UserInfoModal = ({ isOpen, onClose }) => {
    const { userInfo, loginCheck } = useUser();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        tel: '',
        password: '',
        passwordCheck: '',
        image: null
      });

      useEffect(() => {
        if (isOpen && userInfo.id) {
          const fetchUserInfo = async () => {
            try {
              const response = await fetch(`http://localhost:8282/mypage/${userInfo.id}`);
              
              // 응답 상태 확인
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
    
              // 응답 내용을 텍스트로 확인
              const text = await response.text();
              
              // 텍스트를 JSON으로 파싱
              const data = JSON.parse(text);
    
              // 폼 데이터 업데이트
              setFormData({
                name: data.name || '',
                password: '',
                passwordCheck: '',
                email: data.email || '',
                tel: data.tel || '',
                image: data.image || ''
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

        // 로그인 수정 정보 저장
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('username', formData.username);
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('tel', formData.tel);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('passwordCheck', formData.passwordCheck);
            if (formData.image) {
                formDataToSend.append('file', formData.image);
            }

            const response = await fetch(`http://localhost:8282/mypage/update/${userInfo.id}`, {
              method: 'PUT',
              body: formDataToSend
            });
      
            if (!response.ok) throw new Error('Network response was not ok');
      
            await loginCheck(); // 로그인 상태를 업데이트하여 변경된 정보 반영
            onClose(); // 모달 닫기
          } catch (error) {
          console.error('유저 정보 수정 실패:', error);
        }
      };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>회원 정보 수정</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <Text mb={2}>ID:</Text>
            <Input name="username" value={formData.username} isReadOnly />
            <Text mb={2}>이름:</Text>
            <Input name="name" value={formData.name} onChange={handleChange} />
            <Text mb={2}>Email:</Text>
            <Input name="email" value={formData.email} onChange={handleChange} />
            <Text mb={2}>전화번호:</Text>
            <Input name="tel" value={formData.tel} onChange={handleChange} />
            <Text mb={2}>비밀번호:</Text>
            <Input name="password" type="password" value={formData.password} onChange={handleChange} />
            <Text mb={2}>비밀번호 확인:</Text>
            <Input name="passwordCheck" type="password" value={formData.passwordCheck} onChange={handleChange} />
            <Text mb={2}>프로필 사진:</Text>
            <Input type="file" onChange={handleFileChange} />
            {formData.image && <Text mt={2}>현재 이미지: {formData.image.name}</Text>}
        </ModalBody>
        <ModalFooter>
           <Button colorScheme="blue" mr={3} onClick={handleSave}>
            저장
          </Button>
          <Button variant="ghost" onClick={onClose}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserInfoModal;
