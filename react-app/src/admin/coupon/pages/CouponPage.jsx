import React from 'react';
import CouponForm from '../components/CouponForm';
import CouponList from '../components/CouponList';

const CouponPage = () => {
    return (
        <div>
            <h1>쿠폰 관리</h1>
            <CouponForm />
            <CouponList />
        </div>
    );
};

export default CouponPage;
