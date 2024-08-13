import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Box } from '@chakra-ui/react';
import { useUserCoupon } from '../../../admin/coupon/contexts/UserCouponContext'; 
import Swal from 'sweetalert2';

const CouponModal = ({ isOpen, onClose }) => {
  const [couponCode, setCouponCode] = useState('');
  const { addCoupon } = useUserCoupon(); 

  const handleAddCoupon = async () => {
    const result = await addCoupon(couponCode); 
    await Swal.fire({ 
      icon: 'success',
      title: '쿠폰이 추가되었습니다!',
      text: result,
      confirmButtonText: '확인'
    });
    onClose(); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white" width="800px" height="240px" marginTop="100px" pt={6} pb={3} pl={5} pr={2}> 
        <ModalHeader fontSize="xl">쿠폰 등록</ModalHeader> 
        <ModalCloseButton />
        <ModalBody>
          <Box mb={1}>
            <Input 
              placeholder="EX) SUMMER2024" 
              border="none" 
              focusBorderColor="transparent" 
              outline="none"
              textAlign="left" 
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)} 
              sx={{
                fontSize: 'lg !important' 
              }}
            />
            <Box 
              borderBottom="2px" 
              borderColor="#93ADD5" 
              width="95%" 
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button 
            bg="#93ADD5" 
            color="white"
            onClick={handleAddCoupon} 
            _hover={{ bg: "#7c98c2" }} 
            mr={2}
          >
            추가
          </Button>
          <Button variant="outline" color="#93ADD5" onClick={onClose}>
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CouponModal;
