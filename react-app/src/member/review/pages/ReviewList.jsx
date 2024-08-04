import React, { useEffect, useState } from "react";
import { Box, Flex, Spacer, HStack, Grid } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReviewItem from "../components/ReviewItem";
import { useUser } from "../../../general/user/contexts/LoginContextProvider";
import "../css/ReviewList.css";
import MenuBar from "../../../general/common/SideMenu/MenuBar";

const ReviewList = () => {
  const { userInfo } = useUser();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (userInfo && userInfo.id) {
      // userInfo가 존재할 때만 실행
      axios({
        method: "get",
        url: "http://localhost:8282/member/review/list/" + userInfo.id,
      })
        .then((response) => {
          const { data } = response;
          setReviews(data);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
        });
    }
  }, [userInfo]); // userInfo가 변경될 때마다 호출

  console.log(userInfo.id);

  return (
    <>
        <Flex className="container">
          <Box width={300} marginRight={100}>
            <MenuBar />
          </Box>
          <Box>
            <div className="subject">나의 리뷰</div>
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </Box>
        </Flex>
    </>
  );
};

export default ReviewList;
