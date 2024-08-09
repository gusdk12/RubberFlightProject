import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const FlightInfoItem = ({ info }) => {
  const labelStyle = {
    fontSize: 'sm',
    color: 'gray',
    mb: 2,
  };

  const valueStyle = {
    fontSize: 'xl',
  };

    if (!info.timetable || info.timetable.length === 0) {
      return (
        <Flex direction="column" align="center" justify="center" pt={4}>
          <Text fontSize="xl" fontWeight="bold">조회할 수 없는 항공 데이터 입니다.</Text>
        </Flex>
      );
    }

  return (
    <Flex direction="column" spacing={3} gap={7} pt={4}>
      <Flex mb={2} ml={30}>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>편명 | FLIGHT</Text>
          <Text {...valueStyle}>{info.timetable[0].flight?.iataNumber || "정보 없음"}</Text>
        </Box>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>탑승일 | DATE</Text>
          <Text {...valueStyle}>{new Date(info.flightInfo.depSch).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d{1,2})\.$/, '$1')}</Text>
        </Box>
      </Flex>
      <Flex mb={2} ml={30}>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>출발 탑승구 | GATE</Text>
          <Text {...valueStyle}>{info.timetable[0].departure?.gate || "미정"}</Text>
        </Box>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>도착 탑승구 | GATE</Text>
          <Text {...valueStyle}>{info.timetable[0].arrival?.gate || "미정"}</Text>
        </Box>
      </Flex>
      <Flex mb={2} ml={30}>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>출발 터미널 | TERMINAL</Text>
          <Text {...valueStyle}>{info.timetable[0].departure?.terminal || "미정"}</Text>
        </Box>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>도착 터미널 | TERMINAL</Text>
          <Text {...valueStyle}>{info.timetable[0].arrival?.terminal || "미정"}</Text>
        </Box>
      </Flex>
      <Flex mb={2} ml={30}>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>수하물 벨트 번호 | BELT</Text>
          <Text {...valueStyle}>{info.timetable[0].arrival?.baggage || "미정"}</Text>
        </Box>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>탑승 인원 | PASSENGERS</Text>
          <Text {...valueStyle}>{info.flightInfo.reserve.personnel || "정보 없음"}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default FlightInfoItem;
