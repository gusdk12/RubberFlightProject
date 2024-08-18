import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Flex, Heading, Spinner, Image, Text } from '@chakra-ui/react';
import FlightInfoTabs from '../components/FlightInfoTabs';
import img2 from '../../../assets/images/flightInfo/img2.webp';

const FlightInfoList = () => {
  const [flightInfoList, setFlightInfoList] = useState({ upcomingFlights: [], pastFlights: [] });
  const [loading, setLoading] = useState(true);
  const [reviewList, setReviewList] = useState([]);
  const backUrl = process.env.REACT_APP_BACK_URL;

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
        `${backUrl}/review/reviewlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      setReviewList(response.data);
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
        return;
      }

      try {
        const response = await axios.get(`${backUrl}/flightInfo/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { upcomingFlights, pastFlights } = response.data; 

        setFlightInfoList({ upcomingFlights, pastFlights });
      } catch (error) {
        console.error("항공편 정보를 가져오는 데 오류가 발생했습니다:", error);
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

  const { upcomingFlights, pastFlights } = flightInfoList;

  return (
    <Box p={4} backgroundColor="linear-gradient(to left, #ffffff 0%, #ffffff00 3%, #ffffff00 97%,#ffffff 100%)">
      <Flex align="center" mb={4}>
        <Image src={img2} width="30px"/>
        <Text ml={3} color="#0e0e0f" fontFamily="Noto Sans KR" fontSize="27px" fontWeight="900">나의 항공편</Text>
      </Flex>
      <FlightInfoTabs pastFlights={pastFlights} upcomingFlights={upcomingFlights} reviewList={reviewList} />
    </Box>
  );
};

export default FlightInfoList;
