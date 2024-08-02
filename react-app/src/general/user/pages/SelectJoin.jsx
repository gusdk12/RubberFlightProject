import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 import합니다.
import './SelectJoin.css'; // CSS 파일을 별도로 생성하여 스타일을 정의합니다.

const SelectJoin = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 얻기

    // 사용자 회원가입 버튼 클릭 핸들러
    const handleUserClick = () => {
        setSelectedOption('user');
        navigate('/join/user'); // 클릭 시 '/join/user'로 이동
    };

    // 관리자 회원가입 버튼 클릭 핸들러
    const handleAdminClick = () => {
        setSelectedOption('admin');
        navigate('/join/admin'); // 클릭 시 '/join/admin'으로 이동
    };

    return (
        <div className="select-join-container">
            <h2>회원가입 유형을 선택하세요</h2>
            <div className="button-container">
                <button
                    className={`join-button ${selectedOption === 'user' ? 'selected' : ''}`}
                    onClick={handleUserClick}
                >
                    사용자 회원가입
                </button>
                <button
                    className={`join-button ${selectedOption === 'admin' ? 'selected' : ''}`}
                    onClick={handleAdminClick}
                >
                    관리자 회원가입
                </button>
            </div>
        </div>
    );
};

export default SelectJoin;
