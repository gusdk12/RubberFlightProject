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

  const isFutureData = info.timetable && info.timetable.length > 0;
  const isPastData = info.history && info.history.length > 0;

  const getFlightValue = (field, defaultValue = "-") => {
    return field || defaultValue;
  };

  return (
    <Flex direction="column" spacing={3} gap={7} pt={4}>
      <Flex mb={2} ml={30}>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>편명 | FLIGHT</Text>
          <Text {...valueStyle}>
            {info.flightInfo.flightIat}
          </Text>
        </Box>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>탑승일 | DATE</Text>
          <Text {...valueStyle}>
            {new Date(info.flightInfo.depSch).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).replace(/(\d{1,2})\.$/, '$1')  }  
          </Text>
        </Box>
      </Flex>
      <Flex mb={2} ml={30}>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>출발 탑승구 | GATE</Text>
          <Text {...valueStyle}>{getFlightValue(isFutureData ? info.timetable[0]?.departure?.gate : (isPastData ? info.history[0]?.departure?.gate : "-"))}</Text>
        </Box>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>도착 탑승구 | GATE</Text>
          <Text {...valueStyle}>{getFlightValue(isFutureData ? info.timetable[0]?.arrival?.gate : "-")}</Text>
        </Box>
      </Flex>
      <Flex mb={2} ml={30}>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>출발 터미널 | TERMINAL</Text>
          <Text {...valueStyle}>{getFlightValue(isFutureData ? info.timetable[0]?.departure?.terminal : (isPastData ? info.history[0]?.departure?.terminal : "-"))}</Text>
        </Box>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>도착 터미널 | TERMINAL</Text>
          <Text {...valueStyle}>{getFlightValue(isFutureData ? info.timetable[0]?.arrival?.terminal : (isPastData ? info.history[0]?.arrival?.terminal : "-"))}</Text>
        </Box>
      </Flex>
      <Flex mb={2} ml={30}>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>수하물 벨트 번호 | BELT</Text>
          <Text {...valueStyle}>{getFlightValue(isFutureData ? info.timetable[0]?.arrival?.baggage : "-")}</Text>
        </Box>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>탑승 인원 | PASSENGERS</Text>
          <Text {...valueStyle}>{getFlightValue(info.flightInfo.reserve?.personnel)}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default FlightInfoItem;
