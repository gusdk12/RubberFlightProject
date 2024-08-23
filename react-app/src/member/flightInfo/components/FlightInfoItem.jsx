import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const FlightInfoItem = ({ flightInfo, timetable, history }) => {
  const labelStyle = {
    fontSize: 'sm',
    color: 'gray',
    mb: 2,
  };

  const valueStyle = {
    fontSize: 'xl',
  };

  const getFlightValue = (field, defaultValue = "-") => {
    return field || defaultValue;
  };

  const getGateOrTerminalValue = (flightDataValue, infoValue) => {
    return flightDataValue || infoValue || "-";
  };

  const info = flightInfo || {};
  const flightData = timetable.length > 0 ? timetable[0] : history.length > 0 ? history[0] : {};

  return (
    <Flex direction="column" spacing={3} gap={7} pt={4}>
      <Flex mb={2} ml={30}>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>편명 | FLIGHT</Text>
          <Text {...valueStyle}>{info.flightIat || "-"}</Text>
        </Box>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>탑승일 | DATE</Text>
          <Text {...valueStyle}>
            {new Date(info.depSch).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).replace(/(\d{1,2})\.$/, '$1')}
          </Text>
        </Box>

      </Flex>
      <Flex mb={2} ml={30}>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>출발 탑승구 | GATE</Text>
          <Text {...valueStyle}>{getGateOrTerminalValue(flightData.departure?.gate, info.depGate)}</Text>
        </Box>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>도착 탑승구 | GATE</Text>
          <Text {...valueStyle}>{getGateOrTerminalValue(flightData.arrival?.gate, info.arrGate)}</Text>
        </Box>
      </Flex>
      <Flex mb={2} ml={30}>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>출발 터미널 | TERMINAL</Text>
          <Text {...valueStyle}>{getGateOrTerminalValue(flightData.departure?.terminal, info.depTerminal)}</Text>
        </Box>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>도착 터미널 | TERMINAL</Text>
          <Text {...valueStyle}>{getGateOrTerminalValue(flightData.arrival?.terminal, info.arrTerminal)}</Text>
        </Box>
      </Flex>
      <Flex mb={2} ml={30}>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>수하물 벨트 번호 | BELT</Text>
          <Text {...valueStyle}>{getFlightValue(flightData.baggage)}</Text>
        </Box>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>탑승 인원 | PASSENGERS</Text>
          <Text {...valueStyle}>{getFlightValue(info.reserve?.personnel)}</Text>
        </Box>
      </Flex>
      <Flex mb={2} ml={30}>
        <Box flex="1" textAlign="left">
          <Text {...labelStyle}>가격 | PRICE</Text>
          <Text {...valueStyle}>{getFlightValue(info.price, "₩0").toLocaleString()}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default FlightInfoItem;
