import React from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { calculateFlightDuration, convertDelayToMinutesAndSeconds, getFlightDataPriority } from './FlightUtils';
import { IoIosAirplane } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const FlightDetails = ({ info }) => {
  const { flightData } = getFlightDataPriority(info);
  const navigate = useNavigate(); 

  const delayInSeconds = flightData?.departure?.delay || 0;
  const { minutes: delayMinutes } = convertDelayToMinutesAndSeconds(delayInSeconds);

  const formatTime = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <Flex direction="column" mb={4}>
      <Flex justify="space-between">
        <Flex direction="column" ml={4} mt={5}>
          <Text fontSize="23px" fontFamily="Roboto" fontWeight="bold">출발편</Text>
          <Text fontSize="16px" mt={1} color="#815151">{info.flightInfo.airlineName || "-"}</Text>
        </Flex>
        <Button 
          mt={4} 
          onClick={() => navigate(-1)} 
          fontSize="14px"
          padding="2px 12px" 
          bg="#4096FF" 
          color="white" 
          _hover={{ bg: "blue.600" }} 
        >
          뒤로가기
        </Button>
      </Flex>

      <Flex direction="row" mb={4} align="center" gap={7} p={6}>
        {/* 1 */}
        <Flex direction="column" gap={16} align="center">
          <Text fontSize="xl">{formatTime(info.flightInfo.depSch) || "-"}</Text>
          <Text fontSize="md" fontWeight="bold" mt={5} mb={5} color="gray.500">
            {flightData ? calculateFlightDuration(info.flightInfo.depSch, info.flightInfo.arrSch) : "-"}
          </Text>
          <Text fontSize="xl">{formatTime(info.flightInfo.arrSch) || "-"}</Text>
        </Flex>

        {/* 2 */}
        <Box align="center" pl={2}>
          <IoIosAirplane fontSize="30px" color="gray" />
          <Box
            width="3px"
            height="170px"
            mt={3}
            mb={3}
            backgroundColor="gray.300"
          />
          <MdLocationPin fontSize="27px" color="gray" />
        </Box>

        {/* 3 */}
        <Box pl={12}>
          <Flex justify="center" direction="row" align="center" gap={110} mb={8}>
            <Text fontSize="2xl" fontWeight="bold">{info.flightInfo.depIata || "-"}</Text>
            <Text fontSize="lg" fontWeight="bold" color="blue.500">{info.flightInfo.depAirport || "-"}</Text>
            <Text fontSize="md" color="gray.500">출발</Text>
          </Flex>

          <Box textAlign="center" borderWidth="1px" borderColor="gray.300" borderRadius="md" p={4} mb={2}>
            <Flex justify="space-around" direction="row">
              <Flex justify="space-between" direction="column">
                <Text fontSize="sm" mb={2} color="gray.500">
                  {flightData === info.timetable[0] ? "예정 출발시간" : "실제 출발시간"}
                </Text>
                <Text fontSize="30px" fontWeight="bold">
                  {formatTime(flightData?.departure?.estimatedTime) || "-"}
                </Text>
              </Flex>
              <Flex justify="space-between" direction="column">
                <Text fontSize="sm" mb={2} color="gray.500">
                  {flightData === info.timetable[0] ? "예정 도착시간" : "실제 도착시간"}
                </Text>
                <Text fontSize="30px" fontWeight="bold">
                  {formatTime(flightData?.arrival?.estimatedTime) || "-"}
                </Text>
              </Flex>
            </Flex>
          </Box>

          <Text fontSize="sm" color="red.500" mb={8} align="right">총 {delayMinutes} 분 지연되었습니다.</Text>

          <Flex justify="center" direction="row" align="center" gap={90}>
            <Text fontSize="2xl" fontWeight="bold">{info.flightInfo.arrIata || "-"}</Text>
            <Text fontSize="lg" fontWeight="bold" color="blue.500">{info.flightInfo.arrAirport || "-"}</Text>
            <Text fontSize="md" color="gray.500">도착</Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default FlightDetails;
