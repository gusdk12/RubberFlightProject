import React, { useContext, useEffect } from 'react';
import { FlightInfoContext } from '../contexts/FlightInfoContext'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import { Box, Flex, Heading, Button, Image, Text, Link } from '@chakra-ui/react'; 
import img2 from '../../../assets/images/flightInfo/img2.webp';
import FlightInfoItem from '../components/FlightInfoItem';
import FlightDetails from '../components/FlightDetails';
import { FlightInfoProvider } from '../contexts/FlightInfoContext';

const FlightInfoDetail = () => {
  const { flightId } = useParams(); 
  const { flightInfo, setFlightId } = useContext(FlightInfoContext); 
  const navigate = useNavigate(); 

  useEffect(() => {
    document.body.style.overflowY = 'scroll';
  }, []);
 
  useEffect(() => {
    setFlightId(flightId); 
  }, [flightId]);

  const renderFlightDetails = () => {
    
    return (
      <Box className="flight-info-container">
        <FlightDetails info={flightInfo} />
        <Box borderBottom="1px" borderColor="gray.300" my={4} />

        {/* 항공편 세부 정보 항목 */}
        <FlightInfoItem info={flightInfo} />

        <Box mt={4}>
          <Link href={``} color="blue.500" isExternal>
          <Text fontWeight="bold">실시간 비행기 위치 보러가기 </Text>
          </Link>
        </Box>

        <Box mt={4} p={3} borderWidth="1px" borderColor="gray.300" borderRadius="md">
          <Text fontWeight="bold">비행기 탑승 주의사항</Text>
          <Text fontSize="sm">탑승 시 개인 소지품을 잘 챙기시고, 주의사항을 반드시 숙지해 주세요.</Text>
        </Box>
      </Box>
    );
  };

  return (
    <FlightInfoProvider>
      <Box p={4} backgroundColor="linear-gradient(to left, #ffffff 0%, #ffffff00 3%, #ffffff00 97%,#ffffff 100%)">
        <Flex align="center" className="flight-label-container" mb={4}>
          <Image src={img2} width="30px" />
          <Heading as="h1" size="lg" ml={3}>나의 항공편</Heading>
        </Flex>

        <Flex direction="column" align="flex-start" justify="center" maxWidth="700px" mx="auto" width="90%" mb="40px" mt="20px">
          <Button mb={4} onClick={() => navigate(-1)}>뒤로가기</Button>
          
          {flightInfo ? renderFlightDetails() : (
            <Text>항공편 정보를 불러오는 중입니다...</Text>
          )}
        </Flex>
      </Box>
    </FlightInfoProvider>
  );
};

export default FlightInfoDetail;
