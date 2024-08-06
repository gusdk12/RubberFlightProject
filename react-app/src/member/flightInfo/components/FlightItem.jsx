import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const FlightInfoItem = ({ info }) => {

  return (
    <Flex direction="column" spacing={3}>
      <Flex mb={2}>
        <Box flex="1" textAlign="center">
          <Text fontWeight="bold">편명 | FLIGHT</Text>
          <Text>{info.timetable[0].flight?.number || "정보 없음"}</Text>
        </Box>
        <Box flex="1" textAlign="center">
          <Text fontWeight="bold">탑승일 | DATE</Text>
          <Text>{ new Date(info.flightInfo.depSch).toLocaleTimeString([], { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d{1,2})\.$/, '$1')}</Text>
        </Box>
      </Flex>
      <Flex mb={2}>
        <Box flex="1" textAlign="center">
          <Text fontWeight="bold">출발 탑승구 | GATE</Text>
          <Text>{info.timetable[0].departure?.gate || "미정"}</Text>
        </Box>
        <Box flex="1" textAlign="center">
          <Text fontWeight="bold">도착 탑승구 | GATE</Text>
          <Text>{info.timetable[0].arrival?.gate || "미정"}</Text>
        </Box>
      </Flex>
      <Flex mb={2}>
        <Box flex="1" textAlign="center">
          <Text fontWeight="bold">출발 터미널 | TERMINAL</Text>
          <Text>{info.timetable[0].departure?.terminal || "미정"}</Text>
        </Box>
        <Box flex="1" textAlign="center">
          <Text fontWeight="bold">도착 터미널 | TERMINAL</Text>
          <Text>{info.timetable[0].arrival?.terminal || "미정"}</Text>
        </Box>
      </Flex>
      <Flex mb={2}>
        <Box flex="1" textAlign="center">
          <Text fontWeight="bold">수하물 벨트 번호 | BELT</Text>
          <Text>{info.timetable[0].arrival?.baggage || "미정"}</Text>
        </Box>
        <Box flex="1" textAlign="center">
          <Text fontWeight="bold">탑승 인원 | PASSENGERS</Text>
          <Text>{info.timetable[0].reserve?.personnel || "정보 없음"}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default FlightInfoItem;
