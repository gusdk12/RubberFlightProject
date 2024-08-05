import React, { useEffect, useRef, useState } from 'react';
// import {DatePicker, DateRangePicker} from "@nextui-org/react";
import { Box } from '@chakra-ui/react';
import Header from '../../common/Header/Header.jsx';
import ThreeScene from '../component/ThreeScene.jsx';
import '../../../Global/font.css'
import '../CSS/Main.css';
import 'flatpickr/dist/flatpickr.min.css';
import Flatpickr from 'react-flatpickr';
import axios from 'axios';
import { Button, Menu } from 'antd';


const MainPage = () => {
    const [isAirplaneLoaded, setIsAirplaneLoaded] = useState(false);
    const [isSearhMode, setIsSearhMode] = useState(false);
    const [isRoundWay, setIsRoundWay] = useState(true);
    const [dates, setDates] = useState([]);
    const [airports, setAirports] = useState([]); // 공항 데이터
    const [filteredAirports, setFilteredAirports] = useState([]);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 열림 상태
    const menuRef = useRef(null); // 메뉴 참조

    useEffect(() => {
        document.body.style.overflowX = 'hidden';
    }, []);
    useEffect(() => {
        isAirplaneLoaded && document.querySelector(".reserveButton").classList.add("showReserveClass");
        isSearhMode && document.querySelector(".reserveButton").classList.remove("showReserveClass");
        isSearhMode && document.querySelector(".searchBox").classList.add("showSeachClass");
    }, [isAirplaneLoaded, isSearhMode]);

    useEffect(() => {
        // 공항 데이터를 서버에서 가져오는 useEffect
        axios.get('http://localhost:8282/airport/list')
          .then(response => {
            setAirports(response.data);
            setFilteredAirports(response.data);
          })
          .catch(error => {
            console.error("Error fetching airports:", error);
          });
      }, []);

    const handleWayChange = (isRound) => {
        setIsRoundWay(isRound);
        if (!isRound) {
            setDates([dates[0]]); // 편도로 변경 시 첫 번째 날짜만 유지
        }
    };

    // 인원 메뉴
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleIncrement = (type) => {
        switch(type) {
            case 'adults':
                setAdults(adults + 1);
                break;
            case 'children':
                setChildren(children + 1);
                break;
            case 'infants':
                setInfants(infants + 1);
                break;
            default:
                break;
        }
    };

    const handleDecrement = (type) => {
        switch(type) {
            case 'adults':
                if (adults > 1) setAdults(adults - 1);
                break;
            case 'children':
                if (children > 0) setChildren(children - 1);
                break;
            case 'infants':
                if (infants > 0) setInfants(infants - 1);
                break;
            default:
                break;
        }
    };

    const handleSelect = () => {
        // 선택한 인원 수를 처리합니다
        console.log({ adults, children, infants });
        setIsMenuOpen(false); // 선택 후 메뉴 닫기
    };

    return (
        <>
        <Header isMain={true}/>
        <div className="contentpart">
            <ThreeScene setIsAirplaneLoaded={setIsAirplaneLoaded} isSearhMode={isSearhMode}/>
            <Box onClick={() => setIsSearhMode(true)} className="reserveButton">항공권 조회하기</Box>
            
            <Box className="searchBox">
                <div id='wayBox'>
                    <div id='roundway' onClick={() => handleWayChange(true)} className={isRoundWay ? 'active' : ''}>왕복</div> 
                    <div id='oneway' onClick={() => handleWayChange(false)} className={isRoundWay ? '' : 'active'}>편도</div>
                </div>
                <div id='selectBox'>
                    <div id='airportPart'>
                        <div id='depPart'>
                            <div className='airportName'>ICN</div>
                            <div className='selectArrow'/>
                        </div>
                        <div id='arrPart'>
                            <div className='airportName'>도착</div>
                            <div className='selectArrow'/>
                        </div>
                    </div>
                    <div id='datePart'>
                        {isRoundWay ?
                            (
                                <div className="date-picker-container">
                                    <Flatpickr
                                            options={{ mode: "range" }}
                                            value={dates}
                                            onChange={setDates}
                                            className="flatpickr-input"
                                    />
                                </div>
                            )
                            :
                            (
                                <div className="date-picker-container">
                                <Flatpickr
                                        options={{ mode: "single" }}
                                        value={dates}
                                        onChange={setDates}
                                        className="flatpickr-input"
                                    />
                                </div>
                            )
                        }
                    </div>
                    <div id='peoplePart' ref={menuRef}>
                        <Button 
                            className="dropdown-button" 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {`성인 ${adults}명, 소아 ${children}명, 유아 ${infants}명`}
                        </Button>
                        {isMenuOpen && (
                            <div className="menu-container">
                                <div className="menu-item">
                                    <button onClick={() => handleDecrement('adults')}>-</button>
                                    <label>성인 </label>
                                    <span>{adults}명</span>
                                    <button onClick={() => handleIncrement('adults')}>+</button>
                                </div>
                                <div className="menu-item">
                                    <button onClick={() => handleDecrement('children')}>-</button>
                                    <label>소아 </label>
                                    <span>{children}명</span>
                                    <button onClick={() => handleIncrement('children')}>+</button>
                                </div>
                                <div className="menu-item">
                                    <button onClick={() => handleDecrement('infants')}>-</button>
                                    <label>유아 </label>
                                    <span>{infants}명</span>
                                    <button onClick={() => handleIncrement('infants')}>+</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div id='submitButton'>항공권 검색</div>
                </div>
            </Box>
        </div>
        </>
    );
};

export default MainPage;
