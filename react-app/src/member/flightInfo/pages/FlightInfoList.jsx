import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Flex, Heading, Spinner, Image } from '@chakra-ui/react';
import FlightInfoTabs from '../components/FlightInfoTabs';
import img2 from '../../../assets/images/flightInfo/img2.webp';

const FlightInfoList = () => {
  const [flightInfoList, setFlightInfoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewList, setReviewList] = useState([]);

  // 유저 리뷰 데이터 불러오기
  const fetchReviews = async () => {
    const token = Cookies.get('accessToken');
    if (!token) {
      console.error("토큰을 찾을 수 없습니다.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8282/review/reviewlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
    });
      setReviewList(response.data); // 리뷰 목록 리스트
      
    } catch (error) {
      console.error("리뷰를 가져오는 데 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflowY = 'scroll';
  }, []);

  useEffect(() => {
    const fetchFlightInfo = async () => {
      const token = Cookies.get('accessToken'); 
      if (!token) {
        console.error("토큰을 찾을 수 없습니다.");
        setLoading(false);
      }

      try {
        const response = await axios.get('http://localhost:8282/flightInfo/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFlightInfoList(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching flight info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightInfo();
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  // 현재 시각을 기준으로 과거와 미래 항공편을 분류
  const now = new Date();
  const pastFlights = flightInfoList.filter(flight => new Date(flight.arrSch) < now);
  const upcomingFlights = flightInfoList.filter(flight => new Date(flight.arrSch) >= now);
console.log(reviewList)
  return (
    <Box p={4} backgroundColor="linear-gradient(to left, #ffffff 0%, #ffffff00 3%, #ffffff00 97%,#ffffff 100%)">
      <Flex align="center"  mb={4}>
        <Image src={img2} width="30px" />
        <Heading as="h1" size="lg" ml={3}>나의 항공편</Heading>
      </Flex>
      <FlightInfoTabs pastFlights={pastFlights} upcomingFlights={upcomingFlights} reviewList={reviewList}/>
    </Box>
  );
};

export default FlightInfoList;
