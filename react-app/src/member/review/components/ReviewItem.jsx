import React, { useState } from "react";
import { Card, Heading, Flex, Box, Spacer, Text, Stack, ModalOverlay, useDisclosure, Modal, ModalCloseButton, ModalContent, ModalFooter} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ReviewDetail, { StarRating } from "../pages/ReviewDetail";
import ReviewUpdate from "../pages/ReviewUpdate";
import "../css/ReviewItem.css";
import "../../../Global/font.css";

const ReviewItem = (props) => {
  const {
    id,
    title,
    seat_rate,
    service_rate,
    procedure_rate,
    flightmeal_rate,
    lounge_rate,
    clean_rate,
    content,
    date,
  } = props.review;

  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const totalRate = (seat_rate + service_rate + procedure_rate + flightmeal_rate + lounge_rate + clean_rate) / 6;

  const onDetailOpen = () => {
    setIsEditing(false); // Detail 모달창
    onOpen();
   }

 const onUpdateOpen = () => {
  setIsEditing(true); // Update 모달창
 }

  return (
    <>
      <Card className="reviewList" padding={5} paddingLeft={8} width={700} height={200} margin={5}>
        <Flex>
          <Heading fontSize={28} className="reviewHead" marginLeft={35}>
            "{title}"
          </Heading>
          <Spacer />
          <Box className="writedate">{date}</Box>
        </Flex>
        <Flex fontSize={18}>
          <Text className="airlineName">항공사:</Text>
          <Text>탑승일: </Text>
        </Flex>
        <Stack mt="4" fontSize={18}>
          <Flex marginLeft={5}>
            총점:&nbsp;&nbsp;&nbsp;
            <StarRating rate={totalRate}/>
          </Flex>
          <button type="button" className="showbtn" onClick={onDetailOpen}>리뷰 확인</button>
        </Stack>
      </Card>

      <Modal className="reviewBox" isOpen={isOpen} onClose={onClose} size='6xl'>
        <ModalOverlay/>
        <ModalContent sx={{
          background: 'linear-gradient(to bottom, #e3f2f8, #d4eaf3, #8ecbe6)',
          marginTop: '100px'
        }}>
          <ModalCloseButton margin={5} size='xl'/>
          {isEditing ? (<ReviewUpdate review={props.review}/>) : (<ReviewDetail review={props.review}/>)}
          <ModalFooter className="review_btn">
            <button className="modalbtn updatebtn" onClick={onUpdateOpen}>{isEditing ? '이전' : '수정'}</button>
            {isEditing ? (<button className="modalbtn updatebtn">수정</button>) : (<button className="modalbtn deletebtn">삭제</button>)}
          </ModalFooter>
          </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewItem;
