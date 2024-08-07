import React, { useEffect } from 'react';
import CouponForm from '../components/CouponForm';
import CouponList from '../components/CouponList';
import { Box, Flex, Heading } from '@chakra-ui/react';
import Header from '../../../general/common/Header/Header';

const CouponPage = () => {

    useEffect(() => {
        document.body.style.overflowY = 'scroll';
        document.body.style.overflowX = 'scroll';
      }, []);

    return (
        <Box 
            bg="#dde6f5d7" 
            minHeight="100vh" 
            p={5} 
            margin="0 auto" 
        >
            <Header isMain={true}/>
            <Box margin="0 auto" width="50%">
                <Flex direction="column" align="flex-start" marginTop="180px" >
                        <Heading as="h1" size="xl" mb={5}>Coupon</Heading>
                    <Flex direction="row" width="100%">
                        <CouponForm />
                        <CouponList />
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};

export default CouponPage;
