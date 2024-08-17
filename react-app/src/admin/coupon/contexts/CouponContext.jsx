import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const CouponContext = createContext();

export const useCoupon = () => {
    return useContext(CouponContext);
};

export const CouponProvider = ({ children }) => {
    const [coupons, setCoupons] = useState([]);
    const backUrl = process.env.REACT_APP_BACK_URL;

    // 쿠폰 목록 조회
    const fetchCoupons = async () => {
        try {
            const response = await axios.get(`${backUrl}/coupon/list`);
            setCoupons(response.data);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    // 쿠폰 추가
    const addCoupon = async (newCoupon) => {
        try {
            await axios.post(`${backUrl}/coupon/add`, newCoupon);
            fetchCoupons(); 
        } catch (error) {
            console.error('Error adding coupon:', error);
        }
    };

    // 쿠폰 삭제
    const deleteCoupon = async (id) => {
        try {
            await axios.delete(`${backUrl}/coupon/delete/${id}`);
            fetchCoupons(); 
        } catch (error) {
            console.error('Error deleting coupon:', error);
        }
    };

    useEffect(() => {
        fetchCoupons(); 
    }, []);

    return (
        <CouponContext.Provider value={{ coupons, addCoupon, deleteCoupon }}>
            {children}
        </CouponContext.Provider>
    );
};
