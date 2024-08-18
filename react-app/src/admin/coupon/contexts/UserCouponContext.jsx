import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserCouponContext = createContext();

export const UserCouponProvider = ({ children }) => {
  const [coupons, setCoupons] = useState([]);
  const [existingUserCoupons, setExistingUserCoupons] = useState([]); 
  const [existingAdminCoupons, setExistingAdminCoupons] = useState([]); 
  const backUrl = process.env.REACT_APP_BACK_URL;

  const addCoupon = async (couponCode) => {
    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('토큰이 없습니다.');
    }

    try {
      const response = await axios.post(`${backUrl}/coupon/user/add`, 
        { couponCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCoupons((prevCoupons) => [...prevCoupons, response.data]);
      await fetchCoupons(); 
  
      return response.data; 
    } catch (error) {
      throw new Error(error.response.data || '쿠폰 추가 중 오류 발생');
    }
  };

  const fetchCoupons = async () => {
    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('토큰이 없습니다.');
    }

    try {
      // 사용자 쿠폰 목록 가져오기
      const userResponse = await axios.get(`${backUrl}/coupon/user/coupons`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userCouponCodes = userResponse.data.map(coupon => coupon.code); 
      setExistingUserCoupons(userCouponCodes); 

      // 관리자 쿠폰 목록 가져오기
      const adminResponse = await axios.get(`${backUrl}/coupon/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const adminCouponCodes = adminResponse.data.map(coupon => coupon.code); 
      setExistingAdminCoupons(adminCouponCodes); 
      
    } catch (error) {
      console.error('쿠폰 목록을 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <UserCouponContext.Provider value={{ coupons, addCoupon, existingUserCoupons, existingAdminCoupons }}>
      {children}
    </UserCouponContext.Provider>
  );
};

export const useUserCoupon = () => {
  const context = useContext(UserCouponContext);
  return context;
};
