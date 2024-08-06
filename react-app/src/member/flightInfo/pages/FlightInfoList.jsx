import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Flex, Heading, Spinner, Image } from '@chakra-ui/react';
import FlightInfoTabs from '../components/FlightInfoTabs';
import img2 from '../../../assets/images/flightInfo/img2.webp';
import '../common/CSS/FlightInfoListStyle.css';

const FlightInfoList = () => {
  const [flightInfoList, setFlightInfoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlightInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8282/flightInfo/list');
        setFlightInfoList(response.data);
      } catch (error) {
        console.error("Error fetching flight info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightInfo();
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

  return (
    <Box p={4} backgroundColor="linear-gradient(to left, #ffffff 0%, #ffffff00 3%, #ffffff00 97%,#ffffff 100%)">
      <Flex align="center" className="flight-label-container" mb={4}>
        <Image src={img2} width="30px" />
        <Heading as="h1" size="lg" ml={3}>나의 항공편</Heading>
      </Flex>
      <FlightInfoTabs pastFlights={pastFlights} upcomingFlights={upcomingFlights} />
    </Box>
  );
};

export default FlightInfoList;
