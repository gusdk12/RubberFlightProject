import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { TotalStarRating } from "./Rating";
import { motion } from 'framer-motion';
import styles from "../css/ReviewItem.module.css";
import "../../../Global/font.css";

const ReviewItem = ({review, flightInfo}) => {
  const navigate = useNavigate();
  const totalRate = ((review.seat_rate + review.service_rate + review.procedure_rate
     + review.flightmeal_rate + review.lounge_rate + review.clean_rate) / 6).toFixed(1);
  const MotionBox = motion(Box);

  const DetailBtn = () => {
    navigate('/mypage/review/' + review.id); 
   }

  return (
    <>
    <MotionBox
      key={review.id} mb={10} onClick={DetailBtn}
      initial={{ opacity: 0, x: -50, scale: 1 }} animate={{ opacity: 1, x: 0, scale: 1 }}
      whileHover={{ scale: 1.02, x: 0}} exit={{ opacity: 0, x: 0}} 
      transition={{ default: { duration: 0.5 }, scale: { duration: 0.3 }, paddingBottom: { duration: 0.1 }, }}
      position="relative"
      style={{ 
        maxWidth: '600px', minWidth: '600px',
        margin: 'auto', width: '90%',
        borderWidth: '1px', borderRadius: '8px',
        padding: '20px', marginTop: '20px',
        marginBottom: '40px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white', cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.3s ease'
      }}
    >
        <Flex mt='10px'mb='10px'>
          <div className={styles.reviewTitle}>"{review.title}"</div>
          <Spacer />
          <div className={styles.writeDate}>
          {new Date(review.date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d{1,2})\.$/, '$1')}</div>
        </Flex>
        <hr className={styles.line}/>
        {flightInfo &&
          (<Flex>
            <div className={styles.airlineName}>[{flightInfo.airlineName}]</div>
            <Spacer/>
            <div className={styles.boardingdate}>
              <div className={styles.date}>탑승일 | Date</div>
              <div className={styles.boarding}>
              {new Date(flightInfo.depSch).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d{1,2})\.$/, '$1')}
              </div>
            </div>
          </Flex>
        )}
          <Flex>
            <div className={styles.reivewRate}><TotalStarRating rate={totalRate} /></div>
            <div className={styles.totalScore}>({totalRate})</div>
          </Flex>
      </MotionBox>
    </>
  );
};

export default ReviewItem;
