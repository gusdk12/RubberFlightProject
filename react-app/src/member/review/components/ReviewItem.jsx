import React, { useEffect, useState } from "react";
import { Card, Flex, Spacer, Text, ModalOverlay, useDisclosure, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalBody} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ReviewDetail from "../pages/ReviewDetail";
import ReviewUpdate from "../pages/ReviewUpdate";
import { StarRating } from "./Rating";
import styles from "../css/ReviewItem.module.css";
import "../../../Global/font.css";
import { reviewContent, reviewListCard } from "./ReviewStyle";

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

  const navigate = useNavigate();
  const totalRate = (seat_rate + service_rate + procedure_rate + flightmeal_rate + lounge_rate + clean_rate) / 6;

  const DetailBtn = () => {
    navigate('/mypage/review/' + id);
   }

  return (
    <>
      <Card sx={reviewListCard}>
        <Flex mt='10px'mb='20px'>
          <Text ml='25px' fontSize='30px'>"{title}"</Text>
          <Spacer />
          <Text mr='20px' mt='15px'>{date}</Text>
        </Flex>
        <Flex sx={reviewContent}>
          <div className="airlineName">항공사:</div>
          <Spacer />
          <div className="boarding_date">탑승일: </div>
        </Flex>
          <Flex sx={reviewContent}>
            총점:&nbsp;&nbsp;&nbsp;
            <StarRating rate={totalRate}/>
          </Flex>
          <button type="button" className={styles.showbtn} onClick={DetailBtn}>리뷰 확인</button>
      </Card>
    </>
  );
};

export default ReviewItem;
