import { Box, Text, Link as ChakraLink, ScaleFade, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { IoAirplaneOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi";
import { MdOutlineAirplaneTicket } from "react-icons/md";

const MenuBar = () => {
  return (
    <>
      {/* 메뉴바 */}
      <Flex
        direction="column"
        fontSize="25px"
        paddingTop="30px"
        textAlign="left"
        height="auto"
        width="280px"
        backgroundColor="white"
        borderRight="1px solid #E4E7EE"
        justifyContent="space-between"
      >
        <Box>
          <Flex justifyContent="center" mb={3}>
            <Button
              size="lg"
              marginBottom="18px"
              color="white"
              background="linear-gradient(90deg, #0751FE, #2F6EFD, #5187FD, #6796FD)"
              pl={7}
              pr={7}
              pt={6}
              pb={6}
              mt={2}
              _hover={{
                background: "linear-gradient(90deg, #0051FE, #1F6EFD, #3187FD, #4796FD)",
              }}
            >
              <IoAirplaneOutline fontSize="20px" />
              <Text ml={3} fontFamily="Arial, sans-serif" fontWeight="bold">Flight Search</Text>
            </Button>
          </Flex>

          {[
            { name: "내 정보", path: "/mypage" },
            // { name: "내 정보", path: "/mypage", icon: <FiBookOpen /> },
            { name: "예약 정보", path: "/mypage/flight-info" },
            // { name: "예약 정보", path: "/mypage/flight-info", icon: <MdOutlineAirplaneTicket /> },
            { name: "리뷰 내역", path: "/mypage/review", icon: null },
          ].map((item, index) => (
            <ScaleFade key={index} in={true} initialScale={0.9} delay={index * 0.1}>
              <div
                style={{
                  marginBottom: "20px",
                  textAlign: "left",
                  paddingLeft: "50px",
                  transition: "color 0.3s ease, background-color 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ChakraLink
                  as={Link}
                  to={item.path}
                  style={{
                    textDecoration: "none",
                    color: "#1c1c1c",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "18px",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                  _hover={{
                    color: "#007bff",
                    transform: "translateX(5px)",
                  }}
                >
                  {item.icon && <span style={{ marginRight: '8px' }}>{item.icon}</span>}
                  {item.name}
                </ChakraLink>
              </div>
            </ScaleFade>
          ))}
        </Box>

        <Flex justifyContent="center" mb={8}>
          <Button
            size="lg"
            pl={14}
            pr={14}
            pt={4}
            pb={4}
            backgroundColor="white"
            color="#93ADD5"
            border="1px solid #93ADD5"
            _hover={{
              backgroundColor: "#93ADD5",
              color: "white",
            }}
          >
            <Text fontFamily="Arial, sans-serif" fontWeight="bold">logout</Text>
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default MenuBar;
