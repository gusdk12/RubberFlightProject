import React from 'react';
import { useCoupon } from '../contexts/CouponContext';
import { Box, Heading, Text, IconButton, Divider } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const CouponList = () => {
    const { coupons, deleteCoupon } = useCoupon();

    return (
        <Box 
            p={5} 
            width="600px"
        >
            <ul>
                {coupons.map(coupon => (
                    <Box key={coupon.id} style={{ 
                        width: '400px', 
                        marginBottom: '30px',
                        padding: '15px', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: 'md', 
                        position: 'relative', 
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.2s ease',
                        '&:hover': { transform: 'scale(1.02)' }
                    }}>
                        <Text fontWeight="bold" fontSize="lg" mb={1}>
                            [{coupon.airline_name}] {coupon.description}
                        </Text>
                        <Divider borderColor="gray.300" my={2} />
                        <Text fontSize="sm" color="gray.600" mb={3}>{coupon.code}</Text>
                        <Text fontSize="xl" fontWeight="bold" color="red.500" textAlign="right">{coupon.percent}%</Text>
                        <IconButton 
                            aria-label="삭제"
                            icon={<DeleteIcon />} 
                            variant="ghost"
                            color="gray.500" 
                            size="sm" 
                            onClick={() => deleteCoupon(coupon.id)} 
                            transition="color 0.3s ease"
                            _hover={{ color: "gray.600", transform: "translateY(-2px)" }} 
                            style={{ 
                                position: 'absolute', 
                                top: '15px', 
                                right: '15px' 
                            }} 
                        />
                    </Box>
                ))}
            </ul>
        </Box>
    );
};

export default CouponList;
