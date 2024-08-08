import React, { useContext, useState } from "react";
import { useUser } from "../../../general/user/contexts/LoginContextProvider";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Image,
  Input,
  Radio,
  RadioGroup,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Write from "../../../assets/images/review/reviewwrite.webp";
import { RateFormUpdate } from "../components/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/ReviewWrite.module.css";

const ReviewWrite = () => {
  const { userInfo } = useUser();
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

    if (!review.title.trim()) newError.title = "제목을 작성해주세요";
    if (!review.seat_rate) newError.seat_rate = "별점을 입력해주세요";
    if (!review.service_rate) newError.service_rate = "별점을 입력해주세요";
    if (!review.procedure_rate) newError.procedure_rate = "별점을 입력해주세요";
    if (!review.flightmeal_rate) newError.flightmeal_rate = "별점을 입력해주세요";
    if (!review.lounge_rate) newError.lounge_rate = "별점을 입력해주세요";
    if (!review.clean_rate) newError.clean_rate = "별점을 입력해주세요";
    setError(newError);
    return newError;
  };

  // 리뷰 작성하기
  const submitReview = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (!validationError.title) {
      axios({
        method: "post",
        url: "http://localhost:8282/member/review/write",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        data: JSON.stringify(review),
      }).then((response) => {
        const { data, status, statusText } = response;
        if (status === 200) {
          alert("Success", "작성 성공", "success");
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
      <Flex className="subject" mt={10} mb={10}>
        <Image src={Write} className="reviewIcon" />
        <Heading as="h1" size="xl" ml={3}>
          리뷰 작성
        </Heading>
      </Flex>
      <Grid
        templateColumns="repeat(2, 1fr)"
        fontSize={18}
        paddingLeft={10}
        gap={3}
        className="flightInfo"
      >
        <Text>항공사:</Text>
        <Text className="userInfo">
          작성자:&nbsp;&nbsp;&nbsp;{userInfo.name}
        </Text>
      </Grid>
      <Grid
        templateColumns="repeat(2, 1fr)"
        fontSize={18}
        paddingLeft={10}
        gap={3}
      >
        <Text className="flightInfo">탑승일:&nbsp;&nbsp;&nbsp;</Text>
        <Text className="userInfo">작성일:&nbsp;&nbsp;&nbsp;{review.date}</Text>
      </Grid>
      <form onSubmit={submitReview}>
        <FormLabel fontSize={25} ml={5} mt={8}>
          [제목]
        </FormLabel>
        <input
          type="text"
          name="title"
          className="form_title"
          value={review.title}
          onChange={(e) => changeValue(e.target.name, e.target.value)}
        />
        {error && <div className={styles.errorMessage}>{error.title}</div>}
        <FormLabel textAlign="center" fontSize={25} className="question">
          Q. 라운지 시설과 이용은 어떠셨나요?
        </FormLabel>
        <RateFormUpdate
          name="lounge_rate"
          rate={review.lounge_rate}
          changeValue={changeValue}
        />
        {error && <div className={styles.errorMessage}>{error.lounge_rate}</div>}
        <FormLabel textAlign="center" fontSize={25} className="question">
          Q. 체크인과 탑승이 원활히 이루어졌나요?
        </FormLabel>
        <RateFormUpdate
          name="procedure_rate"
          rate={review.procedure_rate}
          changeValue={changeValue}
        />
        {error && <div className={styles.errorMessage}>{error.procedure_rate}</div>}
        <FormLabel textAlign="center" fontSize={25} className="question">
          Q. 비행기의 시설은 깨끗했나요?
        </FormLabel>
        <RateFormUpdate
          name="clean_rate"
          rate={review.clean_rate}
          changeValue={changeValue}
        />
        {error && <div className={styles.errorMessage}>{error.clean_rate}</div>}
        <FormLabel textAlign="center" fontSize={25} className="question">
          Q. 비행기 좌석 공간과 편안함은 어떠셨나요?
        </FormLabel>
        <RateFormUpdate
          name="seat_rate"
          rate={review.seat_rate}
          changeValue={changeValue}
        />
        {error && <div className={styles.errorMessage}>{error.seat_rate}</div>}
        <FormLabel textAlign="center" fontSize={25} className="question">
          Q. 기내 서비스는 어떠셨나요?
        </FormLabel>
        <RateFormUpdate
          name="service_rate"
          rate={review.service_rate}
          changeValue={changeValue}
        />
        {error && <div className={styles.errorMessage}>{error.service_rate}</div>}
        <FormLabel textAlign="center" fontSize={25} className="question">
          Q. 기내식 및 음료는 잘 제공되었나요?
        </FormLabel>
        <RateFormUpdate
          name="flightmeal_rate"
          rate={review.flightmeal_rate}
          changeValue={changeValue}
        />
        {error && <div className={styles.errorMessage}>{error.flightmeal_rate}</div>}
        <FormLabel textAlign="center" fontSize={25} className="question">
          Q. 더 하고 싶은 말을 적어주세요~
        </FormLabel>
        <Textarea
          resize="none"
          name="content"
          value={review.content}
          onChange={(e) => changeValue(e.target.name, e.target.value)}
        />
        <div className={styles.reviewBtn}>
          <button
            type="button"
            className={`${styles.btn} ${styles.prevbtn}`}
            onClick={prev}
          >
            이전
          </button>
          <button
            type="submit"
            className={`${styles.btn} ${styles.updatebtn}`}
          >
            작성
          </button>
        </div>
      </form>
    </>
  );
};

export default ReviewWrite;
