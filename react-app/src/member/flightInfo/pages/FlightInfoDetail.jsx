import React, { useContext, useEffect } from 'react';
import { FlightInfoContext } from '../contexts/FlightInfoContext'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import { Box, Flex, Heading, Button, Image, Text, Link, Spinner } from '@chakra-ui/react'; 
import img2 from '../../../assets/images/flightInfo/img2.webp';
import FlightInfoItem from '../components/FlightInfoItem';
import FlightDetails from '../components/FlightDetails';
import { FlightInfoProvider } from '../contexts/FlightInfoContext';
import { IoIosArrowDroprightCircle } from "react-icons/io";

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
      <Box
        style={{
          maxWidth: '700px',
          minWidth: '700px',
          margin: 'auto',
          width: '90%',
          borderWidth: '1px',
          borderRadius: '8px',
          padding: '16px',
          marginTop: '20px',
          marginBottom: '40px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
        }}
      >
        {/* 상단 FlightDetails.jsx */}
        <FlightDetails info={flightInfo} />
        <Box borderBottom="1px" borderColor="gray.300" my={4} />

        {/* 하단 FlightInfoItem.jsx */}
        <FlightInfoItem info={flightInfo} />

        <Flex justifyContent="flex-end" mt={10} mr={30}>
          <Link href={``} color="blue.500" isExternal display="flex" alignItems="center">
            <Text fontWeight="bold" mr={2}>실시간 비행기 위치 보러가기</Text>
            <IoIosArrowDroprightCircle fontSize="20px" />
          </Link>
        </Flex>

        <Box mt={10} p={10} borderWidth="1px" borderColor="gray.300" borderRadius="md">
          <Text fontSize="xl">비행기 탑승 주의사항</Text>
          <Text fontSize="sm" pt={7}>탑승 시 개인 소지품을 잘 챙기시고, 주의사항을 반드시 숙지해 주세요.</Text>
          <Text fontSize="sm" pt={7}>탑승 시 개인 소지품을 잘 챙기시고, 주의사항을 반드시 숙지해 주세요.</Text>
          <Text fontSize="sm" pt={7}>탑승 시 개인 소지품을 잘 챙기시고, 주의사항을 반드시 숙지해 주세요.</Text>
          <Text fontSize="sm" pt={7}>탑승 시 개인 소지품을 잘 챙기시고, 주의사항을 반드시 숙지해 주세요.</Text>
          <Text fontSize="sm" pt={7}>탑승 시 개인 소지품을 잘 챙기시고, 주의사항을 반드시 숙지해 주세요.</Text>
          <Text fontSize="sm" pt={7}>탑승 시 개인 소지품을 잘 챙기시고, 주의사항을 반드시 숙지해 주세요.</Text>
          <Text fontSize="sm" pt={7}>탑승 시 개인 소지품을 잘 챙기시고, 주의사항을 반드시 숙지해 주세요.</Text>
        </Box>
      </Box>
    );
  };

  return (
    <FlightInfoProvider>
      <Box p={4} backgroundColor="linear-gradient(to left, #ffffff 0%, #ffffff00 3%, #ffffff00 97%,#ffffff 100%)">
        <Flex align="center" mb={4}>
          <Image src={img2} width="30px" />
          <Heading as="h1" size="lg" ml={3}>나의 항공편</Heading>
        </Flex>

        <Flex direction="column" align="flex-start" justify="center" maxWidth="700px" mx="auto" width="90%" mb="40px" mt="20px">
          <Button mb={4} onClick={() => navigate(-1)}>뒤로가기</Button>
          
          {flightInfo ? renderFlightDetails() : (
            <Flex direction="column" justify="center" align="center" height="75vh" width="85vh">
              <Spinner size="lg" mb={5} />
              <Text fontSize="lg">항공편 정보를 불러오는 중입니다...</Text>
            </Flex>
          )}
        </Flex>
      </Box>
    </FlightInfoProvider>
  );
};

export default FlightInfoDetail;
