import React, { useState } from "react";
import { useCoupon } from "../contexts/CouponContext";
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Flex } from "@chakra-ui/react";

const CouponForm = () => {
  const { addCoupon } = useCoupon();
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [description, setDescription] = useState("");
  const [airlineName, setAirlineName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCoupon = {
      code: couponCode,
      percent: discountPercent,
      description,
      airline_name: airlineName || "ALL",
    };
    addCoupon(newCoupon);
    resetForm();
  };

  const resetForm = () => {
    setCouponCode("");
    setDiscountPercent("");
    setDescription("");
    setAirlineName("");
  };

  const inputStyles = {
    variant: "flushed",
    width: "250px",
    padding: "10px",
    mb: "2",
    sx: {
      borderColor: "#cfd9e8e1",
      _hover: { borderColor: "#4d62a8" },
      _focus: { borderColor: "#4d62a8", boxShadow: "none" },
      "::placeholder": {
        color: "#9ba4b2d0",
      },
      fontFamily: "Roboto",
    },
  };

  return (
    <Box
      p={5}
      bg={"white"}
      borderRadius="lg" 
      boxShadow="lg" 
      mb={5}
      height="fit-content"
      minWidth="400px"
    >
      <Box ml={10} mt={7} mb={7}>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>쿠폰 코드</FormLabel>
            <Flex align="center">
              <InputGroup width="auto">
                <Input
                  {...inputStyles}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  required
                  placeholder="EX) SUMMER2024"
                />
              </InputGroup>
            </Flex>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>할인 퍼센트</FormLabel>
            <Flex align="center">
              <InputGroup width="auto">
                <Input
                  type="number"
                  {...inputStyles}
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  required
                  placeholder="20"
                />
                <InputRightElement width="2.5rem">
                  <span>%</span>
                </InputRightElement>
              </InputGroup>
            </Flex>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>설명</FormLabel>
            <Flex align="center">
              <InputGroup width="auto">
                <Input
                  {...inputStyles}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="설명을 입력하세요"
                />
              </InputGroup>
            </Flex>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>항공사 이름</FormLabel>
            <Flex align="center">
              <InputGroup width="auto">
                <Input
                  {...inputStyles}
                  value={airlineName}
                  onChange={(e) => setAirlineName(e.target.value)}
                  placeholder="항공사 이름을 입력하세요"
                />
              </InputGroup>
            </Flex>
          </FormControl>

          <Flex justifyContent="flex-end" mt={5} mr={5}>
            <Button
              type="submit"
              bg="#dde6f5d7"
              color="black"
              width="120px"
              pl="30px"
              pr="30px"
              _hover={{ bg: "#8897c8", color: "white", transform: "translateY(-2px)" }}
              transition="background-color 0.3s ease, transform 0.2s ease"
            >
              쿠폰 추가
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default CouponForm;
