import React, { useState } from "react";
import {Flex, Heading, Image} from "@chakra-ui/react";
import Write from "../../../assets/images/review/reviewwrite.webp";
import { RateFormUpdate } from "../components/Form";
import { useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import styles from "../css/ReviewWrite.module.css";
import {alert} from '../../../apis/alert';

const ReviewWrite = () => {
  const location = useLocation(); // 현재페이지의 위치 정보 가져오는 역할
  const {flight} = location.state || {}; // location.state : navigate 함수가 전달한 state값 가지고 있음
  const navigate = useNavigate();
  const [review, setReview] = useState({
    title: "",
    seat_rate: "",
    service_rate: "",
    procedure_rate: "",
    flightmeal_rate: "",
    lounge_rate: "",
    clean_rate: "",
    content: "",
  });

  // 리뷰 입력하기
  const changeValue = (name, value) => {
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  // 유효성 검증 폼
  const [error, setError] = useState("");
  const validateForm = () => {
    let newError = {
      title: "",
      seat_rate: "",
      service_rate: "",
      procedure_rate: "",
      flightmeal_rate: "",
      lounge_rate: "",
      clean_rate: "",
      content: "",
    };

    if (!review.title.trim()){ 
      newError.title = "제목을 작성해주세요";
    } else if (review.title.trim().length > 30) {
      newError.title = "제목은 30자 이내로 작성해주세요";
    }

    if (!review.seat_rate) newError.seat_rate = "별점을 입력해주세요";
    if (!review.service_rate) newError.service_rate = "별점을 입력해주세요";
    if (!review.procedure_rate) newError.procedure_rate = "별점을 입력해주세요";
    if (!review.flightmeal_rate) newError.flightmeal_rate = "별점을 입력해주세요";
    if (!review.lounge_rate) newError.lounge_rate = "별점을 입력해주세요";
    if (!review.clean_rate) newError.clean_rate = "별점을 입력해주세요";
    if (review.content.length > 50) newError.content = "내용은 50자 이내로 입력해주세요";

    // To. 현아언니. 제출시 오류 수정 부분//
    // setError(newError);
    // return newError;  
    // 이 코드에서는 newError 객체 자체를 반환합니다. newError는 모든 필드에 대한 유효성 검사 결과를 담고 있으며, 오류 메시지가 없는 필드에도 빈 문자열이 들어있습니다. 
    // 따라서 submitReview 함수에서 if (!validationError)를 사용해 유효성 검사가 통과했는지를 확인하려고 하면, 
    // validationError는 항상 객체이므로 이 조건은 항상 false가 됩니다. 즉, 유효성 검사가 통과되지 않은 것으로 간주되고, 폼이 제출되지 않습니다.
    const hasError = Object.keys(newError).some(key => newError[key]);

    setError(newError);
    console.log('Validation error object:', newError);
    return hasError ? newError : null;
  };

  // 리뷰 작성하기
  const submitReview = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (!validationError) {
      axios({
        method: "post",
        url: `http://localhost:8282/review/write/` + flight.id,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        data: JSON.stringify(review),
      }).then((response) => {
        const { data, status, statusText } = response;
        if (status === 201) {
          alert("Success", "작성 성공", "success",
            () => navigate(`/mypage/review/${data.id}`));
        } else {
          alert("Error", "작성 실패", "error");
        }
      });
    }
  };
  
  const prev = () => {
    navigate(-1);
  };

  return (
    <>
      <Flex align="center" m={4}>
        <Image src={Write} width="30px" />
        <Heading as="h1" size="xl" ml={3}>리뷰 작성</Heading>
      </Flex>
      <Flex paddingLeft={10} gap={3} mb='10px'>
        <div className={styles.airlineName}>항공사: {flight.airlineName}</div>
        <div className={styles.boarding}>탑승일: 
          {new Date(flight.depSch).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d{1,2})\.$/, '$1')}</div>
      </Flex>
      <hr/>

      <form onSubmit={submitReview}>
        <div>
          <div className={styles.reviewtitle}>[제목]</div>
          <input type="text" name="title" className={styles.inputTitle}
            value={review.title} onChange={(e) => changeValue(e.target.name, e.target.value)}/>
          {error && <div className={styles.errorMessage}>{error.title}</div>}
        </div>
        <div className={styles.formInput}>
          <div className={styles.question}>Q. 라운지 시설과 이용은 어떠셨나요?</div>
          <RateFormUpdate name='lounge_rate' rate={review.lounge_rate} changeValue={changeValue}/>
          {error && <div className={styles.errorMessage}>{error.lounge_rate}</div>}
        </div>
        <div className={styles.formInput}>
          <div className={styles.question}>Q. 체크인과 탑승이 원활히 이루어졌나요?</div>
          <RateFormUpdate name='procedure_rate' rate={review.procedure_rate} changeValue={changeValue} />
          {error && <div className={styles.errorMessage}>{error.procedure_rate}</div>}
        </div>
        <div className={styles.formInput}>
          <div className={styles.question}>Q. 비행기의 시설은 깨끗했나요?</div>
          <RateFormUpdate name='clean_rate' rate={review.clean_rate} changeValue={changeValue} />
          {error && <div className={styles.errorMessage}>{error.clean_rate}</div>}
        </div>
        <div className={styles.formInput}>
          <div className={styles.question}>Q. 비행기 좌석 공간과 편안함은 어떠셨나요?</div>
          <RateFormUpdate name='seat_rate' rate={review.seat_rate} changeValue={changeValue} />
          {error && <div className={styles.errorMessage}>{error.seat_rate}</div>}
        </div>
        <div className={styles.formInput}>
          <div className={styles.question}>Q. 기내 서비스는 어떠셨나요?</div>
          <RateFormUpdate name='service_rate' rate={review.service_rate} changeValue={changeValue} />
          {error && <div className={styles.errorMessage}>{error.service_rate}</div>}
        </div>
        <div className={styles.formInput}>
          <div className={styles.question}>Q. 기내식 및 음료는 잘 제공되었나요?</div>
          <RateFormUpdate name='flightmeal_rate' rate={review.flightmeal_rate} changeValue={changeValue} />
          {error && <div className={styles.errorMessage}>{error.flightmeal_rate}</div>}
        </div>
        <div className={styles.formInput}>
        <div className={styles.question}>Q. 더 하고 싶은 말을 적어주세요~</div>
        <textarea name="content" value={review.content}  className={styles.reviewcontent}
          onChange={(e) => changeValue(e.target.name, e.target.value)}/>
        {error && <div className={styles.errorMessage}>{error.content}</div>}
        </div>
        <div className={styles.reviewBtn}>
        <button type='button' className={`${styles.btn} ${styles.listbtn}`} onClick={prev}>이전</button>
        <button type='submit' className={`${styles.btn} ${styles.writebtn}`}>등록</button>
        </div>
      </form>
    </>
  );
};

export default ReviewWrite;
