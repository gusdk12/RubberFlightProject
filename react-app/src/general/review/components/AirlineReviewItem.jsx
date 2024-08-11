import { Card, CardBody, CardFooter, Flex, Grid, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spacer, Stack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { StarRating, TotalStarRating } from '../../../member/review/components/Rating';
import styles from '../css/AirLineReviewItem.module.css';

const AirlineReviewItem = ({review, flightInfo}) => {
  const totalRate = ((review.seat_rate + review.service_rate + review.procedure_rate
     + review.flightmeal_rate + review.lounge_rate + review.clean_rate) / 6).toFixed(1);
  
  const {onOpen, isOpen, onClose} = useDisclosure();

    return (
        <>
        <Card w='md' h='350px' mt={5} p={5} pb={5} borderRadius={20}>
          <CardBody>
            <div className={styles.cardtitle}>"{review.title}"</div>
            <hr className={styles.line}/>
            <div className={styles.username}>-유저 이름-</div>
            {flightInfo &&
              <div>
                <div className={styles.airlinename}>[{flightInfo.airlineName}]</div>
                <Flex>
                  <div><TotalStarRating rate={totalRate}/></div>
                  <div className={styles.totalscore}>({totalRate})</div>
                </Flex>
              </div>
            }
          </CardBody>
          <Flex>
            <button type="button" onClick={onOpen} className={styles.viewbtn}></button>
            <div className={styles.userImg}>유저 프로필</div>
          </Flex>
        </Card>

        <Modal isOpen={isOpen} onClose={onClose} size='5xl' isCentered>
          <ModalOverlay/>
          <ModalContent>
            <ModalCloseButton size='m' m={5} _hover='none'/>
            <ModalBody p={20} >
              <div className={styles.reviewwritedate}>작성일:&nbsp;&nbsp;&nbsp;{review.date}</div>
              <div className={styles.title}>"{review.title}"</div>
              <hr className={styles.line}/>
              <Flex mt='20px' mb='20px'>
                <div className={styles.reviewAirlineName}>[{flightInfo.airlineName}]</div>
                <Spacer/>
                <div className={styles.reviewdate}>탑승일:&nbsp;&nbsp;&nbsp;{flightInfo.depSch}</div>
              </Flex>
              <Flex>
              <div><TotalStarRating rate={totalRate} /></div>
              <div className={styles.reviewScore}>({totalRate})</div>
              </Flex>
              <div className={styles.reviewBody}>
                {review.content && <div className={styles.content}>{review.content}</div>}
                <div className={styles.rateBody}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={50}>
                    <Flex marginBottom={5}>
                      <div className={styles.ratename}>라운지:</div>
                      <div className={styles.reviewRate}><StarRating rate={review.lounge_rate} /></div>
                    </Flex>
                    <Flex marginBottom={5}>
                      <div className={styles.ratename}>체크인 및 탑승:</div>
                      <div className={styles.reviewRate}><StarRating rate={review.procedure_rate} /></div>
                    </Flex>
                  </Grid>
                  <Grid templateColumns="repeat(2, 1fr)" gap={50}>
                    <Flex marginBottom={5}>
                      <div className={styles.ratename}>청결도:</div>
                      <div className={styles.reviewRate}><StarRating rate={review.clean_rate} className={styles.reviewRate}/></div>
                    </Flex>
                    <Flex marginBottom={5}>
                      <div className={styles.ratename}>좌석 공간 및 편안함:</div>
                      <div className={styles.reviewRate}><StarRating rate={review.seat_rate} /></div>
                    </Flex>
                  </Grid>
                  <Grid templateColumns="repeat(2, 1fr)" gap={50}>
                    <Flex marginBottom={5}>
                      <div className={styles.ratename}>기내 서비스:</div>
                      <div className={styles.reviewRate}><StarRating rate={review.service_rate} /></div>
                    </Flex>
                    <Flex>
                      <div className={styles.ratename}>기내식 및 음료:</div>
                      <div className={styles.reviewRate}><StarRating rate={review.flightmeal_rate} /></div>
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