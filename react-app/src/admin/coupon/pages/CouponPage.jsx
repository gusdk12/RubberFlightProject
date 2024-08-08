import React, { useEffect } from "react";
import CouponForm from "../components/CouponForm";
import CouponList from "../components/CouponList";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Header from "../../../general/common/Header/Header";

const CouponPage = () => {
  useEffect(() => {
    document.body.style.overflowY = "scroll";
    document.body.style.overflowX = "scroll";
    document.body.style.backgroundColor = "#dde6f5d7";
  }, []);

  return (
    <Box minHeight="100vh" p={5} margin="0 auto">
      <Box ml={200} mr={200}>
        <Header isMain={true} />
        <Flex direction="column" align="flex-start" marginTop="180px">
          <Heading as="h1" size="xl">
            Coupon
          </Heading>
          <Flex width="100%" justify="space-between" mt={14} gap={20}>
            <CouponForm />
            <CouponList />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default CouponPage;
