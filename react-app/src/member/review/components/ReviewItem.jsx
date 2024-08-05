import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Heading,
  Flex,
  Box,
  Spacer,
  Grid,
  Text,
  Stack,
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalBody,
  Textarea,
  ModalFooter,
  background,
} from "@chakra-ui/react";
import Star from "../img/star_32.webp";
import "../css/ReviewItem.css";
import { useUser } from "../../../general/user/contexts/LoginContextProvider";
import "../../../Global/font.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FlightInfoContext } from "../../flightInfo/contexts/FlightInfoContext";

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

  const { userInfo } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
 
  const ReivewUpdate = () => {
    navigate("/member/review/update");
  };

  return (
    <>
      <Card className="reviewList" padding={5} paddingLeft={8} width={800} height={200} margin={5}>
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
            <div className="star-ratings-base">
              <img className="rate" src={Star} alt="별1" />
              <img className="rate" src={Star} alt="별1" />
              <img className="rate" src={Star} alt="별1" />
              <img className="rate" src={Star} alt="별1" />
              <img className="rate" src={Star} alt="별1" />
            </div>
          </Flex>
          <button type="button" className="showbtn" onClick={onOpen}>
            리뷰 확인
          </button>
        </Stack>
      </Card>

      <Modal className="reviewBox" isOpen={isOpen} onClose={onClose} size='6xl'>
        <ModalOverlay/>
        <ModalContent sx={{
          background: 'linear-gradient(to bottom, #e3f2f8, #d4eaf3, #8ecbe6)',
          marginTop: '100px'
        }}>
          <ModalCloseButton margin={5} size='xl'/>
          <ModalHeader className="reviewTitle" fontSize={50}>"{title}"</ModalHeader>
          <Grid templateColumns="repeat(2, 1fr)" className="flightInfo">
            <Flex paddingLeft={10} marginBottom={5}>
              <Text fontSize={23}></Text>&nbsp;&nbsp;&nbsp;
              <div className="star-ratings-base">
                <img className="total_rate" src={Star} alt="별1" />
                <img className="total_rate" src={Star} alt="별1" />
                <img className="total_rate" src={Star} alt="별1" />
                <img className="total_rate" src={Star} alt="별1" />
                <img className="total_rate" src={Star} alt="별1" />
              </div>
            </Flex>
            <Text marginTop={5} fontSize={18} className="userInfo">
              작성자:&nbsp;&nbsp;&nbsp;{userInfo.name}
            </Text>
          </Grid>
          <Grid templateColumns="repeat(2, 1fr)" fontSize={18} paddingLeft={10} gap={3}>
            <Text className="flightInfo">탑승일:&nbsp;&nbsp;&nbsp;</Text>
            <Text className="userInfo">작성일:&nbsp;&nbsp;&nbsp;{date}</Text>
          </Grid>
          <div className="review_body">
            <Text className='review_content' width={940} fontSize={23}>
              {content}
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" fontSize={18} marginLeft={50} gap={50}>
              <Flex paddingLeft={10} marginBottom={5}>
                좌석 공간 및 편안함:&nbsp;&nbsp;&nbsp;
                <div className="star-ratings-base">
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                </div>
              </Flex>
              <Flex paddingLeft={10} marginBottom={5}>
                청결도:&nbsp;&nbsp;&nbsp;
                <div className="star-ratings-base">
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                </div>
              </Flex>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" fontSize={18} marginLeft={50} gap={50}>
              <Flex paddingLeft={10} marginBottom={5}>
                체크인 및 탑승:&nbsp;&nbsp;&nbsp;
                <div className="star-ratings-base">
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                </div>
              </Flex>
              <Flex paddingLeft={10} marginBottom={5}>
                라운지:&nbsp;&nbsp;&nbsp;
                <div className="star-ratings-base">
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                </div>
              </Flex>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" fontSize={18} marginLeft={50} marginBottom={35} gap={50}>
              <Flex paddingLeft={10} marginBottom={5}>
                기내 서비스:&nbsp;&nbsp;&nbsp;
                <div className="star-ratings-base">
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                </div>
              </Flex>
              <Flex paddingLeft={10} marginBottom={5}>
                기내식 및 음료:&nbsp;&nbsp;&nbsp;
                <div className="star-ratings-base">
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                  <img src={Star} alt="별1" />
                </div>
              </Flex>
            </Grid>
          </div>
          <ModalFooter className="review_btn">
            <button className="modalbtn updatebtn" onClick={ReivewUpdate}>수정</button>
            <button className="modalbtn deletebtn">삭제</button>
          </ModalFooter>
          </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewItem;
