import React, { useState, useRef, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Box, Alert, AlertIcon } from '@chakra-ui/react';
import { useUserCoupon } from '../../../admin/coupon/contexts/UserCouponContext'; 
import { validateCouponCode } from '../../../admin/coupon/utils/validateCouponCode'; 
import Swal from 'sweetalert2'; 

const CouponModal = ({ isOpen, onClose }) => {
  const [couponCode, setCouponCode] = useState('');
  const [error, setError] = useState('');
  const { addCoupon, existingUserCoupons, existingAdminCoupons } = useUserCoupon();
  
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleAddCoupon = async () => {
    setError(''); 
    const validationError = validateCouponCode(couponCode, existingUserCoupons, existingAdminCoupons); 
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const result = await addCoupon(couponCode); 
      setError(''); 
      setCouponCode('');
      onClose(); 
      await Swal.fire({
        icon: 'success',
        title: '쿠폰이 추가되었습니다!',
        text: `결제 시 쿠폰을 확인하실 수 있습니다.`,
      });
    } catch (error) {
      console.log('쿠폰 추가 중 발생한 오류:', error);
      setError('쿠폰 추가 중 오류가 발생했습니다.');
    }
  };

  const handleClose = () => {
    setCouponCode('');
    setError('');
    onClose();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddCoupon();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="white"
        width="850px"
        height="240px"
        pt={6}
        pb={3}
        pl={4}
        pr={2}
      >
        <ModalHeader fontSize="xl">쿠폰 등록</ModalHeader> 
        <ModalCloseButton />
        <ModalBody pt={2}>
          <Box>
            <Input 
              placeholder="EX) SUMMER2024" 
              border="none" 
              focusBorderColor="transparent" 
              outline="none"
              textAlign="left" 
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)} 
              onKeyPress={handleKeyPress} 
              ref={inputRef} 
              sx={{
                fontSize: 'lg !important' 
              }}
            />
            <Box 
              borderBottom="2px" 
              borderColor="#93ADD5" 
              width="95%" 
            />
            {error && (
              <Alert status="error" bg="transparent" p={0} mt={2} ml={1}>
                <AlertIcon boxSize={4} color="#93ADD5" /> 
                <Box fontSize="sm" color="#494d51">
                  {error}
                </Box>
              </Alert>
            )}
          </Box>
        </ModalBody>
        <ModalFooter pt={1}>
          <Button 
            bg="#93ADD5" 
            color="white"
            onClick={handleAddCoupon} 
            _hover={{ bg: "#7c98c2" }} 
            mr={2}
          >
            추가
          </Button>
          <Button variant="outline" color="#93ADD5" onClick={handleClose}>
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CouponModal;
