import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserCouponContext = createContext();

export const UserCouponProvider = ({ children }) => {
  const [coupons, setCoupons] = useState([]);

  const addCoupon = async (couponCode) => {
    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('토큰이 없습니다.');
    }

    try {
      const response = await axios.post(`http://localhost:8282/coupon/user/add/${couponCode}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCoupons((prevCoupons) => [...prevCoupons, response.data]);

      return response.data; 
    } catch (error) {
      throw new Error(error.response.data || '쿠폰 추가 중 오류 발생');
    }
  };

  return (
    <UserCouponContext.Provider value={{ coupons, addCoupon }}>
      {children}
    </UserCouponContext.Provider>
  );
};

export const useUserCoupon = () => {
  const context = useContext(UserCouponContext);
  if (!context) {
    throw new Error('useUserCoupon must be used within a UserCouponProvider');
  }
  return context;
};
