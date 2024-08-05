import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const FlightDetails = ({ info }) => {
  
  // 지연 시간 가져오기
  const delayMinutes = info.timetable[0]?.departure?.delay || 0;

  return (
    <Flex direction="column" mb={4} align="center">
      <Flex justify="center" direction="row">
        <Text fontSize="lg" fontWeight="bold">{info.flightInfo.depAirport} ({info.flightInfo.depIata})</Text>
        <Text fontSize="md">출발: { new Date(info.timetable[0]?.departure?.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</Text>
      </Flex>

      <Box textAlign="center" borderWidth="1px" borderColor="gray.300" borderRadius="md" p={4} mb={4}>
        <Flex justify="space-around" direction="row">
          <Flex justify="space-between">
            <Text fontSize="md">예정 출발시간</Text>
            <Text fontSize="lg" fontWeight="bold">{ new Date(info.timetable[0]?.departure?.estimatedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text fontSize="md">예정 도착시간</Text>
            <Text fontSize="lg" fontWeight="bold">{ new Date(info.timetable[0]?.arrival?.estimatedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</Text>
          </Flex>
        </Flex>
      </Box>

      <Text fontSize="md" color="red.500">총 {delayMinutes} 분 지연되었습니다.</Text>

      <Flex justify="center" direction="row">
        <Text fontSize="lg" fontWeight="bold">{info.flightInfo.arrAirport} ({info.flightInfo.arrIata})</Text>
        <Text fontSize="md">도착:{ new Date(info.timetable[0]?.arrival?.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</Text>
      </Flex>
    </Flex>
  );
};

export default FlightDetails;
