import React, { useEffect, useState } from "react";
import { Card, Flex, Spacer, Text} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { StarRating } from "./Rating";
import styles from "../css/ReviewItem.module.css";
import "../../../Global/font.css";
import { reviewContent, reviewListCard } from "./ReviewStyle";
import { useUser } from "../../../general/user/contexts/LoginContextProvider";
import axios from "axios";

const ReviewItem = ({review, flightInfo}) => {
  const navigate = useNavigate();
  const totalRate = ((review.seat_rate + review.service_rate + review.procedure_rate + review.flightmeal_rate + review.lounge_rate + review.clean_rate) / 6).toFixed(1);
  const DetailBtn = () => {
    navigate('/mypage/review/' + review.id);
   }
 
  return (
    <>
      <Card sx={reviewListCard}>
        <Flex mt='10px'mb='20px'>
          <Text ml='25px' fontSize='30px'>"{review.title}"</Text>
          <Spacer />
          <Text mr='20px' mt='15px'>{review.date}</Text>
        </Flex>
        {flightInfo &&
        <Flex sx={reviewContent}>
          <div className={styles.contentTitle}>항공사: {flightInfo.airlineName} </div>
          <Spacer />
          <div className="boarding_date">탑승일: {flightInfo.depSch}</div>
        </Flex>}
          <Flex sx={reviewContent}>
            <div className={styles.contentTitle}>총점:</div>&nbsp;&nbsp;&nbsp;
            <StarRating rate={totalRate}/>
            <div className={styles.contentTitle}>({totalRate})</div>
          </Flex>
          <button type="button" className={styles.showbtn} onClick={DetailBtn}>리뷰 확인</button>
      </Card>
    </>
  );
};

export default ReviewItem;
