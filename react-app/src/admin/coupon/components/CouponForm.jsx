import React, { useState } from 'react';
import { useCoupon } from '../contexts/CouponContext';
import '../common/CSS/CouponStyle.css';
import { Box } from '@chakra-ui/react';

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
        <Box className="coupon-form-container">
            <Box className="coupon-form-title">
                <h2>쿠폰 추가하기</h2>
            </Box>
            <form onSubmit={handleSubmit} className="coupon-form">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="쿠폰 코드"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        placeholder="할인 퍼센트"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(e.target.value)}
                        required
                    />
                    <span className="percent-sign">%</span>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="설명"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <select
                        value={airlineName}
                        onChange={(e) => setAirlineName(e.target.value)}
                        required
                    >
                        <option value="" disabled>항공사 선택</option>
                        {airlineOptions.map((airline, index) => (
                            <option key={index} value={airline}>{airline}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn-add">쿠폰 추가</button>
            </form>
        </Box>
    );
};

export default CouponForm;
