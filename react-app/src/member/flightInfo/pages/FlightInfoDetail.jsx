import React, { useContext, useEffect } from 'react';
import { FlightInfoContext } from '../contexts/FlightInfoContext'; 
import { useParams } from 'react-router-dom'; 
import { Box, Flex, Text, Link, Spinner } from '@chakra-ui/react'; 
import FlightInfoItem from '../components/FlightInfoItem';
import FlightDetails from '../components/FlightDetails';
import { FlightInfoProvider } from '../contexts/FlightInfoContext';
import { IoIosArrowDroprightCircle } from "react-icons/io";

const FlightInfoDetail = () => {
  const { flightId } = useParams(); 
  const { flightInfo, flightHistory, setFlightId } = useContext(FlightInfoContext); 

  useEffect(() => {
    document.body.style.overflowY = 'scroll';
  }, []);
 
  useEffect(() => {
    setFlightId(flightId); 
  }, [flightId]);

  const renderFlightDetails = () => {
    return (
      <Box
        style={{
          margin: '0 auto',
          maxWidth: '700px',
          minWidth: '700px',  
          padding: '16px',
          borderWidth: '1px',
          borderRadius: '8px',
          backgroundColor: 'white',
        }}
      >
        {/* 상단 FlightDetails.jsx */}
        {flightHistory && flightHistory.length > 0 ? (
          <FlightDetails info={flightHistory} /> 
        ) : (
          <FlightDetails info={flightInfo} /> 
        )}
        <Box borderBottom="1px" borderColor="gray.300" my={4} />

        {/* 하단 FlightInfoItem.jsx */}
        {flightHistory && flightHistory.length > 0 ? (
          <FlightInfoItem info={flightHistory} /> 
        ) : (
          <FlightInfoItem info={flightInfo} /> 
        )}

        {flightInfo?.timetable?.[0]?.flight?.iataNumber && (
          <Flex justifyContent="flex-end" mt={10} mr={30}>
            <Link 
              href={`/live?flight=${flightInfo.timetable[0].flight.iataNumber}`} 
              color="blue.500"
              display="flex" 
              alignItems="center"
            >
              <Text fontWeight="bold" mr={2}>실시간 비행기 위치 보러가기</Text>
              <IoIosArrowDroprightCircle fontSize="20px" />
            </Link>
          </Flex>
        )}

        <Box mt={10} p={10} borderWidth="1px" borderColor="gray.300" borderRadius="md">
          <Text fontSize="2xl">비행기 탑승시 주의사항</Text>
          <Text fontSize="15px" mt={7} color="gray.700">
            1. 탑승 수속을 위해 최소 2시간 전에 공항에 도착하세요.
          </Text>
          <Text fontSize="15px" mt={5} color="gray.700">
            2. 귀중품은 항상 소지하고, 귀중품을 위탁 수하물에 넣지 마세요.
          </Text>
          <Text fontSize="15px" mt={5} color="gray.700">
            3. 안전벨트는 비행기가 이륙할 때와 착륙할 때 반드시 착용하세요.
          </Text>
          <Text fontSize="15px" mt={5} color="gray.700">
            4. 기내에서의 전자기기 사용 규정을 준수하세요.
          </Text>
          <Text fontSize="15px" mt={5} color="gray.700">
            5. 기내에서 음주 및 흡연은 금지되어 있습니다.
          </Text>
          <Text fontSize="15px" mt={5} color="gray.700">
            6. 비상 상황 발생 시 승무원의 지시에 따라 행동하세요.
          </Text>
        </Box>
      </Box>
    );
  };

  return (
    <FlightInfoProvider>
      <Box p={4} backgroundColor="linear-gradient(to left, #ffffff 0%, #ffffff00 3%, #ffffff00 97%,#ffffff 100%)" 
        style={{  
          marginTop: '20px',
          marginBottom: '20px',
          overflowY: 'auto', 
          height: '105vh', 
          scrollbarWidth: 'thin', 
          scrollbarColor: '#6d92cc #fbfdff', 
          scrollBehavior: 'smooth',  
        }}>

        <Flex direction="column" align="flex-start">
          {flightInfo ? renderFlightDetails() : (
            <Flex justify="center" align="center" height="100vh" width="100%">
              <Spinner size="xl" />
            </Flex>
          )}
        </Flex>
      </Box>
    </FlightInfoProvider>
  );
};

export default FlightInfoDetail;
