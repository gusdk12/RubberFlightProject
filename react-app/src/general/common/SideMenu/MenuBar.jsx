import { Box,Text, Link as ChakraLink, Divider, Heading, ScaleFade } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const MenuBar = () => {
  return (
    <>
      <Box
        fontSize="25px"
        paddingTop="30px"
        textAlign="left"
        height="80vh"
        width="300px"
        backgroundColor="white"
        borderRadius="10px"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      >
        <Heading
          as="h1"
          size="xl"
          marginBottom="18px"
          color="#1b1919"
          paddingLeft="50px"
        >
          MY PAGE
        </Heading>

        <Divider borderWidth="3px" mb={30} />

        {[
          { name: "내 정보", path: "/mypage" },
          { name: "예약 정보", path: "/mypage/flight-info" },
          { name: "리뷰 내역", path: "/mypage/review" },
          { name: "일정", path: "/mypage/" },
          { name: "체크리스트", path: "/mypage/" },
        ].map((item, index) => (
          <ScaleFade key={index} in={true} initialScale={0.9} delay={index * 0.1}>
            <div
              style={{
                marginBottom: "20px",
                textAlign: "left",
                paddingLeft: "50px",
                transition: "color 0.3s ease, background-color 0.3s ease",
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
                  display: "block",
                }}
                _hover={{
                  backgroundColor: "#dde6f5d7",
                  color: "#007bff",
                  transform: "translateX(5px)",
                }}
              >
                {item.name}
              </ChakraLink>
            </div>
          </ScaleFade>
        ))}
      </Box>
    </>
  );
};

export default MenuBar;
