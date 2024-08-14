import React, { useState } from "react";
import { useCoupon } from "../contexts/CouponContext";
import { Box, Button, FormControl, FormLabel, Input, Grid, Flex } from "@chakra-ui/react";

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
    padding: "10px",
    mb: "2",
    sx: {
      borderColor: "#cfd9e8e1",
      _hover: { borderColor: "#4d62a8" },
      _focus: { borderColor: "#4d62a8", boxShadow: "none" },
      "::placeholder": {
        color: "#9ba4b2d0",
      },
      fontFamily: "Noto Sans KR",
      fontSize: "16px !important",
    },
  };

  return (
    <Box p={5} maxWidth="800px" margin="0 auto">
      <form onSubmit={handleSubmit}>
        <Grid templateColumns="1fr 1.5fr" gap={4} mt={10}>
          {/* 쿠폰 코드 입력폼 */}
          <FormControl>
            <Flex align="center" justify="center">
              <FormLabel fontSize="19px" textAlign="center">쿠폰 코드</FormLabel>
            </Flex>
          </FormControl>
          <FormControl>
            <Input
              {...inputStyles}
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              required
              placeholder="EX) SUMMER2024"
            />
            <Box borderBottom="2px" borderColor="#93ADD5" />
          </FormControl>

          {/* 할인 퍼센트 입력폼 */}
          <FormControl>
            <Flex align="center" justify="center">
              <FormLabel fontSize="19px" textAlign="center">할인 퍼센트</FormLabel>
            </Flex>
          </FormControl>
          <FormControl>
            <Input
              type="number"
              {...inputStyles}
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              required
              placeholder="20"
            />
            <Box borderBottom="2px" borderColor="#93ADD5" />
          </FormControl>

          {/* 설명 입력폼 */}
          <FormControl>
            <Flex align="center" justify="center">
              <FormLabel fontSize="19px" textAlign="center">설명</FormLabel>
            </Flex>
          </FormControl>
          <FormControl>
            <Input
              {...inputStyles}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="설명을 입력하세요"
            />
            <Box borderBottom="2px" borderColor="#93ADD5" />
          </FormControl>

          {/* 항공사 이름 입력폼 */}
          <FormControl>
            <Flex align="center" justify="center">
              <FormLabel fontSize="19px" textAlign="center">항공사 이름</FormLabel>
            </Flex>
          </FormControl>
          <FormControl>
            <Input
              {...inputStyles}
              value={airlineName}
              onChange={(e) => setAirlineName(e.target.value)}
              placeholder="항공사 이름을 입력하세요"
            />
            <Box borderBottom="2px" borderColor="#93ADD5" />
          </FormControl>
        </Grid>

        <Button
          type="submit"
          bg="#dde6f5d7"
          color="black"
          width="120px"
          mt={10}
          _hover={{ bg: "#8897c8", color: "white", transform: "translateY(-2px)" }}
          transition="background-color 0.3s ease, transform 0.2s ease"
        >
          쿠폰 추가
        </Button>
      </form>
    </Box>
  );
};

export default CouponForm;
