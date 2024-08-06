import React from 'react';
import { Box, Flex, Heading, Text, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { calculateFlightDuration, getStatusText } from './FlightUtils';
import img1 from '../../../assets/images/flightInfo/img1.webp';

const MotionBox = motion(Box);

const FlightInfoCard = ({ flight, index, tabKey }) => {
  const navigate = useNavigate(); 
  const status = getStatusText(flight);

  return (
    <MotionBox
      key={flight.id + tabKey} 
      className="flight-info-container flight-item"
      mb={10}
      onClick={() => navigate(`/member/mypage/flight-info/${flight.id}`)} 
      initial={{ opacity: 0, x: -50, scale: 1 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      exit={{ opacity: 0, x: 50 }} 
      transition={{
        default: { duration: 0.5, delay: index * 0.1 },
        scale: { duration: 0.2 }
      }}
    >
      {/* 항공편 출발지 및 도착지 정보 */}
      <Flex justify="space-between" align="center" ml={2} mt={1}>
        <Heading as="h2" size="md" m={2}>
          {flight.depAirport} ({flight.depIata}) → {flight.arrAirport} ({flight.arrIata})
        </Heading>
        <Text fontSize="md" color="#c17777" fontWeight="bold" mr={7}>{flight.airlineName}</Text>
      </Flex>
      <Flex direction="row" justify="center" align="center">
        <Flex flex="3" direction="row" justify="center" align="center" mt={5}>

          {/* 출발지 정보 */}
          <Box className="flight-section">
            <Text className="flight-label">{flight.depIata}</Text>
            <Text className="flight-info-text">{flight.depAirport}</Text>
            <Text fontSize="sm" mt={3}>출발</Text>
            <Text fontSize="md" fontWeight="bold" mt={3} mb={2}>
              {new Date(flight.depSch).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
            </Text>
          </Box>

          {/* 비행 상태 및 비행 시간 정보 */}
          <Box className="flight-section" ml={6}>
            <Image src={img1} alt="Departure Icon" width="100%" />
            <Text borderWidth="1px" borderRadius="md" pt={2} pb={1.5} mt={3} borderColor={status.color} color="white" backgroundColor={status.color}>
              {status.text}
            </Text>
            <Text fontSize="sm" mt={3} color="#9e9e9e" fontWeight="bold">비행 예정 시간</Text>
            <Text fontSize="md" fontWeight="bold" mt={3}>{calculateFlightDuration(flight.depSch, flight.arrSch)}</Text>
          </Box>

          {/* 도착지 정보 */}
          <Box className="flight-section" ml={6}>
            <Text className="flight-label" pb={1}>{flight.arrIata}</Text>
            <Text className="flight-info-text">{flight.arrAirport}</Text>
            <Text fontSize="sm" mt={3}>도착</Text>
            <Text fontSize="md" fontWeight="bold" mt={3} mb={2}>
              {new Date(flight.arrSch).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
            </Text>
          </Box>
        </Flex>

        {/* 탑승 정보 */}
        <Box flex="1" mt={4} mr={3} textAlign="center">
          <Text fontSize="sm" mt={3} color="#9e9e9e" fontWeight="bold">탑승일 | DATE</Text>
          <Text fontSize="md" mt={1} fontWeight="bold">
            {new Date(flight.depSch).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d{1,2})\.$/, '$1')}
          </Text>
          <Text fontSize="sm" mt={3} color="#9e9e9e" fontWeight="bold">인원 | COUNT</Text>
          <Text fontSize="md" mt={1} fontWeight="bold">{flight.reserve.personnel}명</Text>
          <Text fontSize="sm" mt={3} color="#9e9e9e" fontWeight="bold">탑승시간 | TIME</Text>
          <Text fontSize="md" mt={1} fontWeight="bold">
            {new Date(flight.depSch).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </Text>
        </Box>
      </Flex>
    </MotionBox>
  );
};

export default FlightInfoCard;
