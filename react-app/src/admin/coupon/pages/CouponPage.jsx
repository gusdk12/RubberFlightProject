import React from 'react';
import CouponForm from '../components/CouponForm';
import CouponList from '../components/CouponList';
import '../common/CSS/CouponStyle.css';
import { Box, Flex } from '@chakra-ui/react';

const CouponPage = () => {
    return (
        <Box className="page">
            <Box className="coupon-page">
                <Flex className="coupon-container" justify="space-between" align="flex-start" gap={4}>
                    <Box className="form-list-container">
                        <h1>쿠폰 추가하기</h1>
                        
                    </Box>

                    <Box className="coupon-list-container">
                        <CouponForm />
                        <CouponList />
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default CouponPage;
