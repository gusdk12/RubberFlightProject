import React, { useState } from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel, Text, Box } from '@chakra-ui/react';
import FlightInfoCard from './FlightInfoCard';
import { Flex } from 'antd';

const FlightInfoTabs = ({ pastFlights = [], upcomingFlights = [], reviewList = [] }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Tabs
      variant="line"
      onChange={handleTabChange}
      mt={7}
      ml={7}
      mr={7}
    >
      <TabList>
        <Tab _selected={{ color: "#6d9eeb", borderBottom: "2px solid #6d9eeb", fontWeight: "bold" }}>
          예정된 예약
        </Tab>
        <Tab _selected={{ color: "#6d9eeb", borderBottom: "2px solid #6d9eeb", fontWeight: "bold" }}>
          지난 예약
        </Tab>
      </TabList>
      <TabPanels
        style={{
          maxWidth: '800px',
          minWidth: '800px',
          width: '90%',
          height: '88vh',
          margin: 'auto',
          marginTop: '20px',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: '#6d92cc #fbfdff',
          scrollBehavior: 'smooth',
        }}
      >
        <TabPanel>
          {upcomingFlights.length > 0 ? (
            <Flex direction="row" align="flex-start">
              <Box flex="1">
                {upcomingFlights.map((flight) => (
                  <FlightInfoCard key={flight.id} flight={flight} isPast={false} />
                ))}
              </Box>
            </Flex>
          ) : (
            <Text>예약된 항공편이 없습니다.</Text>
          )}
        </TabPanel>

        <TabPanel>
          {pastFlights.length > 0 ? (
            <Flex direction="row" align="flex-start">
              <Box flex="1">
                {pastFlights.map((flight) => {
                  const review = reviewList.find((review) => flight.id === review.flightInfo.id);
                  return (
                    <FlightInfoCard 
                      key={flight.id} 
                      flight={flight} 
                      isPast={true} 
                      review={review} 
                    />
                  );
                })}
              </Box>
            </Flex>
          ) : (
            <Text>지난 예약된 항공편이 없습니다.</Text>
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default FlightInfoTabs;
