import React, { useEffect, useState } from "react";
import { useUser } from "../../../general/user/contexts/LoginContextProvider";
import { Box, Flex, Heading, Image, Spacer, Textarea } from "@chakra-ui/react";
import { RateFormUpdate } from "../components/Form";
import axios from "axios";
import {alert} from '../../../apis/alert';
import { useNavigate, useParams } from "react-router-dom";
import Write from "../../../assets/images/review/reviewwrite.webp";
import styles from '../css/ReviewUpdate.module.css';

const ReviewUpdate = () => {
  const {id} = useParams();
  const {userInfo} = useUser();
  const navigate = useNavigate();
  const [review, setReview] = useState({
    title: "",
    seat_rate : "",
    service_rate: "",
    procedure_rate: "",
    flightmeal_rate: "",
    lounge_rate: "",
    clean_rate: "", 
    content:""
  });

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8282/review/detail/" + id,
    })
      .then(response => {
        const { data, status, statusText } = response;
        if (status === 200) {
          console.log(data)
          setReview(data);
        } else {
          alert('Error', '조회 실패', 'error');
        }
      });
  },[]);

  // 수정할 데이터 입력하기
  const changeValue = (name, value) => {
    setReview((prevReview) => ({
      ...prevReview,
      [name] : value
    }));
  }

  // 유효성 검증 폼
const [error, setError] = useState('');
const validateForm = () => {
  let newError = {title:'', content:''};

  if (!review.title.trim()){ 
    newError.title = "제목을 작성해주세요";
  } else if (review.title.trim().length > 30) {
    newError.title = "제목은 30자 이내로 작성해주세요";
  }
  if (review.content.length > 50) newError.content = "내용은 50자 이내로 입력해주세요";
  
  setError(newError);
  return Object.keys(newError).some(key => newError[key]);
};

 // 데이터 수정하기
 const submitReview = (e) => {
  e.preventDefault();
  
  const validationError = validateForm();
  if(!validationError){
    axios({
      method: "put",
      url: "http://localhost:8282/review/update",
      headers: {
          "Content-Type": 'application/json;charset=utf-8',
      },
      data: JSON.stringify(review),
  })
    .then(response => {
        const { data, status, statusText } = response;
        if (status === 200) {
          alert('Success', '수정 성공', 'success',
            () => navigate(`/mypage/review/${data.id}`));
        } else {
          alert('Error', '수정 실패', 'error');
        }
    });
  }    
}

const prev = () => {
  navigate(-1);
}
console.log(review)
  return (          
    <>
    <Box p={4}>
      <Flex align="center" m={4} >
        <Image src={Write} width="30px" />
        <Heading as="h1" size="lg" ml={3}>나의 리뷰</Heading>
      </Flex>
        <div className={styles.writedate}>작성일:&nbsp;&nbsp;&nbsp;
        {new Date(review.date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d{1,2})\.$/, '$1')}</div>
        {review.flightInfo && 
        (<Flex paddingLeft={10} gap={3} mb='10px' mt='40px'>
          <div className={styles.airlineName}>항공사: {review.flightInfo.airlineName}</div>
          <div className={styles.boarding}>탑승일:&nbsp;&nbsp;&nbsp;
          {new Date(review.flightInfo.depSch).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d{1,2})\.$/, '$1')}</div>
        </Flex>)}
      <hr/>
      <form onSubmit={submitReview}>
        <Box
          style={{ 
            maxWidth: '900px', minWidth: '900px',
            margin: 'auto', width: '90%',
            borderWidth: '1px', borderRadius: '8px',
            padding: '20px', marginTop: '40px',
            marginBottom: '40px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white'
        }}>
        <div>
          <div className={styles.reviewtitle}>[제목]</div>
          <input type="text" name="title" className={styles.inputTitle}
            value={review.title} onChange={(e) => changeValue(e.target.name, e.target.value)}/>
          {error && <div className={styles.errorMessage}>{error.title}</div>}
          </div>
          <hr className={styles.line}/>
          <div className={styles.formInput}>
            <div className={styles.question}>Q. 라운지 시설과 이용은 어떠셨나요?</div>
            <RateFormUpdate name='lounge_rate' rate={review.lounge_rate} changeValue={changeValue}/>
          </div>
          <div className={styles.formInput}>
            <div className={styles.question}>Q. 체크인과 탑승이 원활히 이루어졌나요?</div>
            <RateFormUpdate name='procedure_rate' rate={review.procedure_rate} changeValue={changeValue} />
          </div>
          <div className={styles.formInput}>
            <div className={styles.question}>Q. 비행기의 시설은 깨끗했나요?</div>
            <RateFormUpdate name='clean_rate' rate={review.clean_rate} changeValue={changeValue} />
          </div>
          <div className={styles.formInput}>
            <div className={styles.question}>Q. 비행기 좌석 공간과 편안함은 어떠셨나요?</div>
            <RateFormUpdate name='seat_rate' rate={review.seat_rate} changeValue={changeValue} />
          </div>
          <div className={styles.formInput}>
            <div className={styles.question}>Q. 기내 서비스는 어떠셨나요?</div>
            <RateFormUpdate name='service_rate' rate={review.service_rate} changeValue={changeValue} />
          </div>
          <div className={styles.formInput}>
            <div className={styles.question}>Q. 기내식 및 음료는 잘 제공되었나요?</div>
            <RateFormUpdate name='flightmeal_rate' rate={review.flightmeal_rate} changeValue={changeValue} />
          </div>
          <div className={styles.formInput}>
          <div className={styles.question}>Q. 더 하고 싶은 말을 적어주세요~</div>
          <textarea name="content" value={review.content}  className={styles.reviewcontent}
            onChange={(e) => changeValue(e.target.name, e.target.value)}/>
          {error && <div className={styles.errorMessage}>{error.content}</div>}
          </div>
        </Box>
        <div className={styles.reviewBtn}>
        <button type='button' className={`${styles.btn} ${styles.prevbtn}`} onClick={prev}>이전</button>
        <button type='submit' className={`${styles.btn} ${styles.updatebtn}`}>수정</button>
        </div>
      </form>
      </Box>
    </>
  );
};

export default ReviewUpdate;
