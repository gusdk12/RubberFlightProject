import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 import합니다.
import './SelectJoin.css'; // CSS 파일을 별도로 생성하여 스타일을 정의합니다.
import Header from '../../common/Header/Header';


const SelectJoin = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();

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

    const home = () => {
        navigate("/");
    }

    return (
        <>
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 100
            }}
        >
            <div
                style={{
                backgroundImage: 'url(/images/icons/commercial-plane.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                width: '75px',
                height: '75px',
                cursor: 'pointer'
                }}
                onClick={home}
            ></div>
            </div>
        {/* <Header/ > */}
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
        </>
    );
};

export default SelectJoin;
