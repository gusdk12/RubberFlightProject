import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Text } from '@chakra-ui/react';

const CouponModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>쿠폰 추가</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={2}>쿠폰 코드를 입력하세요:</Text>
          <Input placeholder="쿠폰 코드" />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            추가
          </Button>
          <Button variant="ghost" onClick={onClose}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CouponModal;
