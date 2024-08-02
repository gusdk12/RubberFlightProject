import React, { useState } from 'react';
import { useCoupon } from '../contexts/CouponContext';

const CouponForm = () => {
    const { addCoupon } = useCoupon();
    const [couponCode, setCouponCode] = useState('');
    const [discountPercent, setDiscountPercent] = useState('');
    const [description, setDescription] = useState('');
    const [airlineName, setAirlineName] = useState('');

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
        <form onSubmit={handleSubmit}>
            <h2>쿠폰 추가</h2>
            <input
                type="text"
                placeholder="쿠폰 코드"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="할인 퍼센트"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="설명"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="항공사 이름"
                value={airlineName}
                onChange={(e) => setAirlineName(e.target.value)}
                required
            />
            <button type="submit">쿠폰 추가</button>
        </form>
    );
};

export default CouponForm;
