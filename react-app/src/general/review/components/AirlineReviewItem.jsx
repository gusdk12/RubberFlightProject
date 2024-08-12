import { Box, Card, CardBody, CardFooter, Flex, Grid, Img, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spacer, Stack, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { StarRating, TotalStarRating } from '../../../member/review/components/Rating';
import styles from '../css/AirLineReviewItem.module.css';
import { motion } from 'framer-motion';
import { Image } from '@chakra-ui/react'

const AirlineReviewItem = ({flightInfo}) => {
  const totalRate = ((flightInfo.review.seat_rate + flightInfo.review.service_rate + flightInfo.review.procedure_rate
     + flightInfo.review.flightmeal_rate + flightInfo.review.lounge_rate + flightInfo.review.clean_rate) / 6).toFixed(1);
  
  const {onOpen, isOpen, onClose} = useDisclosure(); 
  const MotionBox = motion(Box);

    return (
        <>
        <MotionBox
          key={flightInfo.review.id} onClick={onOpen}
          initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, x: 0, scale: 1 }}
          whileHover={{ scale: 1.02 }} exit={{ opacity: 0 }} 
          transition={{ default: { duration: 0.5 }, scale: { duration: 0.3 }, paddingBottom: { duration: 0.1 } }}
          position="relative"
          style={{ 
            maxWidth: '420px', minWidth: '420px', 
            margin: 'auto', width: '90%', height: '330px',
            borderWidth: '1px', borderRadius: '20px',
            padding: '16px', marginTop: '20px',
            marginBottom: '40px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white', cursor: 'pointer',
            transition: 'background-color 0.3s ease, transform 0.3s ease'
          }}
        >
          <div className={styles.cardtitle}>"{flightInfo.review.title}"</div>
          <hr className={styles.line}/>
          <div className={styles.username}>{flightInfo.reserve.user.name}</div>
          <div className={styles.userImg}><Image src={flightInfo.reserve.user.image}/></div>
          <div>
            <div className={styles.airlinename}>[{flightInfo.review.airline.name}]</div>
            <Flex>
              <div className={styles.airlinerate}><TotalStarRating rate={totalRate}/></div>
              <div className={styles.totalscore}>({totalRate})</div>
            </Flex>
          </div>
        </MotionBox>

        <Modal isOpen={isOpen} onClose={onClose} size='5xl' isCentered>
          <ModalOverlay/>
          <ModalContent>
            <ModalCloseButton size='m' m={5} _hover='none'/>
            <ModalBody p={20} >
              <div className={styles.reviewwritedate}>작성일:&nbsp;&nbsp;&nbsp;
              {new Date(flightInfo.review.date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d{1,2})\.$/, '$1')}</div>
              <div className={styles.title}>"{flightInfo.review.title}"</div>
              <hr className={styles.line}/>
              <Flex mt='20px' mb='20px'>
                <div className={styles.reviewAirlineName}>[{flightInfo.review.airline.name}]</div>
                <Spacer/>
                <div className={styles.dateGroup}>
                  <div className={styles.reviewdate}>탑승일 | Date</div>
                  <div className={styles.boarding}>
                  {new Date(flightInfo.depSch).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d{1,2})\.$/, '$1')}
                  </div>
                </div>
              </Flex>
              <Flex>
              <div className={styles.reviewrate}><TotalStarRating rate={totalRate} /></div>
              <div className={styles.reviewScore}>({totalRate})</div>
              </Flex>
              <div className={styles.reviewBody}>
                {flightInfo.review.content && <div className={styles.content}>{flightInfo.review.content}</div>}
                <div className={styles.rateBody}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={50}>
                    <Flex marginBottom={5}>
                      <div className={styles.ratename}>라운지:</div>
                      <div className={styles.reviewRate}><StarRating rate={flightInfo.review.lounge_rate} /></div>
                    </Flex>
                    <Flex marginBottom={5}>
                      <div className={styles.ratename}>체크인 및 탑승:</div>
                      <div className={styles.reviewRate}><StarRating rate={flightInfo.review.procedure_rate} /></div>
                    </Flex>
                  </Grid>
                  <Grid templateColumns="repeat(2, 1fr)" gap={50}>
                    <Flex marginBottom={5}>
                      <div className={styles.ratename}>청결도:</div>
                      <div className={styles.reviewRate}><StarRating rate={flightInfo.review.clean_rate} className={styles.reviewRate}/></div>
                    </Flex>
                    <Flex marginBottom={5}>
                      <div className={styles.ratename}>좌석 공간 및 편안함:</div>
                      <div className={styles.reviewRate}><StarRating rate={flightInfo.review.seat_rate} /></div>
                    </Flex>
                  </Grid>
                  <Grid templateColumns="repeat(2, 1fr)" gap={50}>
                    <Flex marginBottom={5}>
                      <div className={styles.ratename}>기내 서비스:</div>
                      <div className={styles.reviewRate}><StarRating rate={flightInfo.review.service_rate} /></div>
                    </Flex>
                    <Flex>
                      <div className={styles.ratename}>기내식 및 음료:</div>
                      <div className={styles.reviewRate}><StarRating rate={flightInfo.review.flightmeal_rate} /></div>
                    </Flex>
                  </Grid>
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
        </>
    );
};

export default AirlineReviewItem;