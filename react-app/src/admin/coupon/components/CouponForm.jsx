import React, { useState } from 'react';
import { useCoupon } from '../contexts/CouponContext';
import { Box, Button, FormControl, FormLabel, Input, Select, Heading } from '@chakra-ui/react';

const CouponForm = () => {
    const { addCoupon } = useCoupon();
    const [couponCode, setCouponCode] = useState('');
    const [discountPercent, setDiscountPercent] = useState('');
    const [description, setDescription] = useState('');
    const [airlineName, setAirlineName] = useState('');

    const airlineOptions = [
        '대한항공',
        '아시아나항공',
        '제주항공',
        '진에어',
        '티웨이항공'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCoupon = {
            code: couponCode,
            percent: discountPercent,
            description,
            airline_name: airlineName,
        };
        addCoupon(newCoupon);
        resetForm();
    };

    const resetForm = () => {
        setCouponCode('');
        setDiscountPercent('');
        setDescription('');
        setAirlineName('');
    };

    return (
        <Box 
            p={5} 
            bg={'white'}
            borderRadius="md" 
            boxShadow="md" 
            mb={5}
            mr={5}
            height="fit-content" 
            width="700px"
        >
            <Box width="400px" ml={2} mt={7} mb={7}>
                <form onSubmit={handleSubmit}>
                    <FormControl mb={4}>
                        <FormLabel>쿠폰 코드</FormLabel>
                        <Input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>할인 퍼센트</FormLabel>
                        <Input
                            type="number"
                            value={discountPercent}
                            onChange={(e) => setDiscountPercent(e.target.value)}
                            required
                        />
                        <span>%</span>
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>설명</FormLabel>
                        <Input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>항공사 선택</FormLabel>
                        <Select
                            value={airlineName}
                            onChange={(e) => setAirlineName(e.target.value)}
                            required
                        >
                            <option value="" disabled>선택하세요</option>
                            {airlineOptions.map((airline, index) => (
                                <option key={index} value={airline}>{airline}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        bg="#dde6f5d7" 
                        color="black"
                        width="30%"
                        _hover={{ bg: "#4da861", transform: "translateY(-2px)" }}
                        transition="background-color 0.3s ease, transform 0.2s ease"
                    >
                        쿠폰 추가
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default CouponForm;
