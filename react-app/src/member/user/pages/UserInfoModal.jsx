import React, { useEffect, useRef, useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Button, Input, Text, Flex, FormControl,
  FormLabel, Image,
  Select,
  Box,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { useUser } from '../../../general/user/contexts/LoginContextProvider';
import Swal from 'sweetalert2';
import styles from "../CSS/UserInfoModal.module.css";

const PasswordInput = ({ placeholder, name, value, onChange, onBlur }) => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        <InputGroup size='md'>
        <Input
            className={styles.input}
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            backgroundColor={'white'}
            // Set font-family to a sans-serif font
            fontFamily='system-ui, sans-serif !important'
            textAlign={'left'}
            fontSize={'18px !important'}
            borderBottom='1px solid #ced4da'
            borderRadius='4px'
        />
        <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick} bg={'#586D92'} color={'white'}>
                {show ? 'Hide' : 'Show'}
            </Button>
        </InputRightElement>
    </InputGroup>
    );
};

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

  // 파일 input을 참조할 ref 생성
  const fileInputRef = useRef(null);

   // 파일 선택 대화상자 열기
   const handleImageClick = () => {
    fileInputRef.current.click();
  };


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
        Swal.fire({
            icon: 'error',
            title: '비밀번호 오류',
            text: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
            willOpen: () => {
                const swalContainer = document.querySelector('.swal2-container');
                if (swalContainer) {
                  swalContainer.style.zIndex = '9999'; // Set the z-index dynamically
                }
            }
          });
          return;
        }

        if (!validateEmail(`${formData.email}@${formData.emailDomain}`)) {
            Swal.fire({
              icon: 'error',
              title: '이메일 오류',
              text: '유효하지 않은 이메일 주소입니다.',
              willOpen: () => {
                const swalContainer = document.querySelector('.swal2-container');
                if (swalContainer) {
                  swalContainer.style.zIndex = '9999'; // Set the z-index dynamically
                }
              }
            });
            return;
          }

          if (!validatePhoneNumber(formData.tel1, formData.tel2, formData.tel3)) {
            Swal.fire({
              icon: 'error',
              title: '전화번호 오류',
              text: '전화번호 형식이 유효하지 않습니다.',
              willOpen: () => {
                const swalContainer = document.querySelector('.swal2-container');
                if (swalContainer) {
                  swalContainer.style.zIndex = '9999'; // Set the z-index dynamically
                }
              }
            });
            return;
          }

          if (!validateName(formData.name)) {
            Swal.fire({
                icon: 'error',
                title: '이름 오류',
                text: '이름 형식이 올바르지 않습니다.',
                willOpen: () => {
                    const swalContainer = document.querySelector('.swal2-container');
                if(swalContainer){
                    swalContainer.style.zIndex = '9999';
                }
                }
            });
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

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhoneNumber = (tel1, tel2, tel3) => 
  /^\d{3}$/.test(tel1) && /^\d{4}$/.test(tel2) && /^\d{4}$/.test(tel3);

  const validateName = (name) => /^[a-zA-Z가-힣\s]+$/.test(name);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent bg="#ffffff" borderRadius="md" boxShadow="lg">
        <ModalHeader fontSize="30px" fontWeight="bold" className={styles.modalTitle}>회원 정보 수정</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" p={4} maxWidth="500px" mx="auto">

          <FormControl id="profileImage" mb={4}>
                <FormLabel fontWeight="medium">프로필 사진:</FormLabel>
                <Box 
                    onClick={handleImageClick} 
                    mb={2} 
                    textAlign="center"  // Box 내의 요소를 가운데 정렬
                >
                    {formData.existingImage && !formData.image && (
                    <Image 
                        src={formData.existingImage} 
                        alt="Existing Profile" 
                        boxSize="150px" 
                        objectFit="cover" 
                        cursor="pointer" 
                        display="inline-block" // 이미지가 인라인 블록으로 표시되도록
                    />
                    )}
                    {formData.image && (
                    <Image 
                        src={URL.createObjectURL(formData.image)} 
                        alt="Selected Profile" 
                        boxSize="100px" 
                        objectFit="cover" 
                        display="inline-block" // 이미지가 인라인 블록으로 표시되도록
                    />
                    )}
                </Box>
                {/* 숨겨진 파일 input */}
                <Input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
</FormControl>

            <FormControl id="name" mb={4}>
              <FormLabel fontWeight="medium">이름:</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                bg="white"
                className={styles.input}
              />
            </FormControl>
    
            <FormControl id="email" mb={4}>
              <FormLabel fontWeight="medium">이메일:</FormLabel>
              <Box display="flex" alignItems="center">
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  bg="white"
                  borderColor="#d1d1d1"
                  className={styles.input}
                />
                @
                <Select
                  name="emailDomain"
                  value={formData.emailDomain}
                  onChange={handleChange}
                  bg="white"
                  borderColor="#d1d1d1"
                  ml={2}
                  className={styles.input}
                >
                  <option value="naver.com" className={styles.input}>naver.com</option>
                  <option value="gmail.com" className={styles.input}>gmail.com</option>
                  <option value="hanmail.net" className={styles.input}>hanmail.net</option>
                  <option value="nate.com" className={styles.input}>nate.com</option>
                  <option value="yahoo.com" className={styles.input}>yahoo.com</option>
                  <option value="hotmail.com" className={styles.input}>hotmail.com</option>
                  <option value="daum.net" className={styles.input}>daum.net</option>
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
                  className={styles.input}
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
                  className={styles.input}
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
                  className={styles.input}
                />
              </Flex>
            </FormControl>
    
            <FormControl id="password" mb={4}>
              <FormLabel fontWeight="medium">비밀번호:</FormLabel>
              <PasswordInput
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                bg="white"
              />
            </FormControl>
    
            <FormControl id="passwordCheck" mb={4}>
              <FormLabel fontWeight="medium">비밀번호 확인:</FormLabel>
              <PasswordInput
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
          <Button colorScheme="blue" mr={3} onClick={handleSave} className={styles.saveButton}>
            저장
          </Button>
          <Button variant="outline" onClick={onClose}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserInfoModal;