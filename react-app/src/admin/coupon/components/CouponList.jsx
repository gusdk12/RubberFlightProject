import React from 'react';
import { useCoupon } from '../contexts/CouponContext';

const CouponList = () => {
    const { coupons, deleteCoupon } = useCoupon();

    return (
        <div>
            <h2>쿠폰 목록</h2>
            <ul>
                {coupons.map(coupon => (
                    <li key={coupon.id}>
                        <span>{coupon.code} - {coupon.percent}%</span>
                        <button onClick={() => deleteCoupon(coupon.id)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CouponList;
