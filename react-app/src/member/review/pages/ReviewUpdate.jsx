import React, { useEffect, useState } from "react";
import { useUser } from "../../../general/user/contexts/LoginContextProvider";
import { Flex, Grid, Heading, Image, Text, Textarea } from "@chakra-ui/react";
import { RateFormUpdate } from "../components/Form";
import Write from "../../../assets/images/review/reviewwrite.webp";
import styles from '../css/ReviewUpdate.module.css';
import axios from "axios";
import {alert} from '../../../apis/alert';
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ReviewUpdate = () => {
  const location = useLocation(); // 현재페이지의 위치 정보 가져오는 역할
  const {flightInfo} = location.state || {}; // location.state : navigate 함수가 전달한 state값 가지고 있음
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
  return newError;
};

 // 데이터 수정하기
 const submitReview = (e) => {
  e.preventDefault();
  const validationError = validateForm();
  console.log(validationError)
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

  return (          
    <>
          <Flex className="subject" mt={10} mb={10}>
            <Image src={Write} className="reviewIcon" />
            <Heading as="h1" size="xl" ml={3}>리뷰 수정</Heading>
          </Flex>
          <Grid templateColumns="repeat(2, 1fr)" fontSize={18} paddingLeft={10} gap={3} className="flightInfo">
              <Text>항공사: {flightInfo.airlineName}</Text>
              <Text className="userInfo">작성자:&nbsp;&nbsp;&nbsp;{userInfo.name}</Text>
          </Grid>
          <Grid templateColumns="repeat(2, 1fr)" fontSize={18} paddingLeft={10} gap={3}>
            <Text className="flightInfo">탑승일:&nbsp;&nbsp;&nbsp;{flightInfo.depSch}</Text>
            <Text className="userInfo">작성일:&nbsp;&nbsp;&nbsp;{review.date}</Text>
          </Grid>
          <form onSubmit={submitReview}>
            <div fontSize={25} ml={5} mt={8}>[제목]</div>
            <input type="text" name="title" className="form_title" value={review.title} onChange={(e) => changeValue(e.target.name, e.target.value)}/>
            {error && <div className={styles.errorMessage}>{error.title}</div>}
            <div className="question">Q. 라운지 시설과 이용은 어떠셨나요?</div>
            <RateFormUpdate name='lounge_rate' rate={review.lounge_rate} changeValue={changeValue}/>
            <div className="question">Q. 체크인과 탑승이 원활히 이루어졌나요?</div>
            <RateFormUpdate name='procedure_rate' rate={review.procedure_rate} changeValue={changeValue} />
            <div className="question">Q. 비행기의 시설은 깨끗했나요?</div>
            <RateFormUpdate name='clean_rate' rate={review.clean_rate} changeValue={changeValue} />
            <div className="question">Q. 비행기 좌석 공간과 편안함은 어떠셨나요?</div>
            <RateFormUpdate name='seat_rate' rate={review.seat_rate} changeValue={changeValue} />
            <div className="question">Q. 기내 서비스는 어떠셨나요?</div>
            <RateFormUpdate name='service_rate' rate={review.service_rate} changeValue={changeValue} />
            <div className="question">Q. 기내식 및 음료는 잘 제공되었나요?</div>
            <RateFormUpdate name='flightmeal_rate' rate={review.flightmeal_rate} changeValue={changeValue} />
            <div className="question">Q. 더 하고 싶은 말을 적어주세요~</div>
            <Textarea resize='none' name="content" value={review.content} onChange={(e) => changeValue(e.target.name, e.target.value)}/>
            {error && <div className={styles.errorMessage}>{error.content}</div>}
            <div className={styles.reviewBtn}>
            <button type='button' className={`${styles.btn} ${styles.prevbtn}`} onClick={prev}>이전</button>
            <button type='submit' className={`${styles.btn} ${styles.updatebtn}`}>수정</button>
            </div>
          </form>
    </>
  );
};

export default ReviewUpdate;
