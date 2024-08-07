import React, { useState } from "react";
import { useUser } from "../../../general/user/contexts/LoginContextProvider";
import { FormControl, FormLabel,Image,Input, ModalBody, Textarea } from "@chakra-ui/react";
import Write from "../../../assets/images/review/reviewwrite.webp";
import '../css/ReviewUpdate.css';

const ReviewUpdate = (props) => {
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

  const [review, setReview] = useState();
  const totalRate = (seat_rate + service_rate + procedure_rate + flightmeal_rate + lounge_rate + clean_rate) / 6;

  return (
    <>
    <ModalBody className="updateForm">
    <div className="subject">
            <Image src={Write} className="reviewIcon" />
            &nbsp;&nbsp;리뷰 수정
          </div>
      <FormControl>
        <FormLabel fontSize={25}>제목</FormLabel>
        <Input type="text" value={title}/>
        <FormLabel textAlign='center' fontSize={25} className="question">Q. 라운지 시설과 이용은 어떠셨나요?</FormLabel>
          <div class="rating" id="star_rate">
              <input type="radio" name="rate" value="5" id="star5" checked={lounge_rate === 5}/><label htmlFor="star5"></label>
              <input type="radio" name="rate" value="4" id="star4" checked={lounge_rate === 4}/><label htmlFor="star4"></label>
              <input type="radio" name="rate" value="3" id="star3" checked={lounge_rate === 3}/><label htmlFor="star3"></label>
              <input type="radio" name="rate" value="2" id="star2" checked={lounge_rate === 2}/><label htmlFor="star2"></label>
              <input type="radio" name="rate" value="1" id="star1" checked={lounge_rate === 1}/><label htmlFor="star1"></label>
          </div>
          <FormLabel textAlign='center' fontSize={25} className="question">Q. 체크인과 탑승이 원활히 이루어졌나요?</FormLabel>
          <div class="rating" id="star_rate">
              <input type="radio" name="rate" value="5" id="star5" checked={lounge_rate === 5}/><label htmlFor="star5"></label>
              <input type="radio" name="rate" value="4" id="star4" checked={lounge_rate === 4}/><label htmlFor="star4"></label>
              <input type="radio" name="rate" value="3" id="star3" checked={lounge_rate === 3}/><label htmlFor="star3"></label>
              <input type="radio" name="rate" value="2" id="star2" checked={lounge_rate === 2}/><label htmlFor="star2"></label>
              <input type="radio" name="rate" value="1" id="star1" checked={lounge_rate === 1}/><label htmlFor="star1"></label>
          </div>
          <FormLabel textAlign='center' fontSize={25} className="question">Q. 비행기의 시설은 깨끗했나요?</FormLabel>
          <div class="rating" id="star_rate">
              <input type="radio" name="rate" value="5" id="star5" checked={lounge_rate === 5}/><label htmlFor="star5"></label>
              <input type="radio" name="rate" value="4" id="star4" checked={lounge_rate === 4}/><label htmlFor="star4"></label>
              <input type="radio" name="rate" value="3" id="star3" checked={lounge_rate === 3}/><label htmlFor="star3"></label>
              <input type="radio" name="rate" value="2" id="star2" checked={lounge_rate === 2}/><label htmlFor="star2"></label>
              <input type="radio" name="rate" value="1" id="star1" checked={lounge_rate === 1}/><label htmlFor="star1"></label>
          </div>
          <FormLabel textAlign='center' fontSize={25} className="question">Q. 비행기 좌석 공간과 편안함은 어떠셨나요?</FormLabel>
          <div class="rating" id="star_rate">
              <input type="radio" name="rate" value="5" id="star5" checked={lounge_rate === 5}/><label htmlFor="star5"></label>
              <input type="radio" name="rate" value="4" id="star4" checked={lounge_rate === 4}/><label htmlFor="star4"></label>
              <input type="radio" name="rate" value="3" id="star3" checked={lounge_rate === 3}/><label htmlFor="star3"></label>
              <input type="radio" name="rate" value="2" id="star2" checked={lounge_rate === 2}/><label htmlFor="star2"></label>
              <input type="radio" name="rate" value="1" id="star1" checked={lounge_rate === 1}/><label htmlFor="star1"></label>
          </div>
          <FormLabel textAlign='center' fontSize={25} className="question">Q. 기내 서비스는 어떠셨나요?</FormLabel>
          <div class="rating" id="star_rate">
              <input type="radio" name="rate" value="5" id="star5" checked={lounge_rate === 5}/><label htmlFor="star5"></label>
              <input type="radio" name="rate" value="4" id="star4" checked={lounge_rate === 4}/><label htmlFor="star4"></label>
              <input type="radio" name="rate" value="3" id="star3" checked={lounge_rate === 3}/><label htmlFor="star3"></label>
              <input type="radio" name="rate" value="2" id="star2" checked={lounge_rate === 2}/><label htmlFor="star2"></label>
              <input type="radio" name="rate" value="1" id="star1" checked={lounge_rate === 1}/><label htmlFor="star1"></label>
          </div>
          <FormLabel textAlign='center' fontSize={25} className="question">Q. 기내식 및 음료는 잘 제공되었나요?</FormLabel>
          <div class="rating" id="star_rate">
              <input type="radio" name="rate" value="5" id="star5" checked={lounge_rate === 5}/><label htmlFor="star5"></label>
              <input type="radio" name="rate" value="4" id="star4" checked={lounge_rate === 4}/><label htmlFor="star4"></label>
              <input type="radio" name="rate" value="3" id="star3" checked={lounge_rate === 3}/><label htmlFor="star3"></label>
              <input type="radio" name="rate" value="2" id="star2" checked={lounge_rate === 2}/><label htmlFor="star2"></label>
              <input type="radio" name="rate" value="1" id="star1" checked={lounge_rate === 1}/><label htmlFor="star1"></label>
          </div>
          <FormLabel textAlign='center' fontSize={25} className="question">Q. 더 하고 싶은 말을 적어주세요~</FormLabel>
          <Textarea resize='none'/>
      </FormControl>
      </ModalBody>
    </>
  );
};

export default ReviewUpdate;
