export const validateCoupon = (couponCode, discountPercent, description, existingCoupons) => {
  const errors = [];

  if (!couponCode) {
    errors.push('쿠폰 코드를 입력해주세요.');
  } else if (couponCode.length < 5) {
    errors.push('쿠폰 코드 길이가 너무 짧습니다.');
  } else if (couponCode.length > 70) {
    errors.push('쿠폰 코드는 70자를 초과할 수 없습니다.');
  } else if (!/^[A-Za-z0-9-]+$/.test(couponCode)) {
    errors.push('유효하지 않은 쿠폰 코드 형식입니다.');
  } else if (existingCoupons.some(coupon => coupon.code === couponCode)) {
    errors.push('이미 보유한 쿠폰입니다.');
  }

  if (!discountPercent) {
    errors.push('할인 퍼센트를 입력해주세요.');
  } else if (isNaN(discountPercent)) {
    errors.push('할인 퍼센트는 숫자여야 합니다.');
  }

  if (!description) {
    errors.push('설명을 입력해주세요.');
  }

  return errors.length > 0 ? errors : null;
};
