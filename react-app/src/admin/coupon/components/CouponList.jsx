import React from 'react';
import { useCoupon } from '../contexts/CouponContext';
import '../common/CSS/CouponStyle.css';

const CouponList = () => {
    const { coupons, deleteCoupon } = useCoupon();

    return (
        <div className="coupon-list">
            <h2>쿠폰 목록</h2>
            <ul>
                {coupons.map(coupon => (
                    <li key={coupon.id} className="coupon-item">
                        <span className="coupon-info">{coupon.code} - {coupon.percent}%</span>
                        <button onClick={() => deleteCoupon(coupon.id)} className="btn-delete">삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CouponList;
