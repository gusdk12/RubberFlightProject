import React, { useEffect, useRef, useState } from 'react';
// import {DatePicker, DateRangePicker} from "@nextui-org/react";
import { Box, Input } from '@chakra-ui/react';
import Header from '../../common/Header/Header.jsx';
import ThreeScene from '../component/ThreeScene.jsx';
import '../../../Global/font.css'
// import '../CSS/Main.css';
import 'flatpickr/dist/flatpickr.min.css';
import Flatpickr from 'react-flatpickr';
import axios from 'axios';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { color } from 'framer-motion';
import style from '../CSS/Main.module.css'
import '../../reserve/css/flatpickr.css'
 
const MainPage = () => {
    const [isAirplaneLoaded, setIsAirplaneLoaded] = useState(false);
    const [isSearhMode, setIsSearhMode] = useState(false);
    const [isRoundWay, setIsRoundWay] = useState(true);

    const [dates, setDates] = useState([]);
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    
    const [departure, setDeparture] = useState('ICN');
    const [arrival, setArrival] = useState('');
    const [airports, setAirports] = useState([]); // 공항 데이터
    const [filteredAirports, setFilteredAirports] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);
    const [isEditing, setIsEditing] = useState({ departure: false, arrival: false });
    const autocompleteRef = useRef(null);
    const [showSearch, setShowSearch] = useState(false);    // 공항 선택

    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const navigate = useNavigate();

    const reserveButtonRef = useRef(null);
    const searchBoxRef = useRef(null);

    // useEffect(() => {
    //     document.body.style.overflow = 'hidden';
    // }, []);
    // useEffect(() => {
    //     isAirplaneLoaded && document.querySelector(`#${style.reserveButton}`).classList.add(style.showReserveClass);
    //     isSearhMode && document.querySelector(`#${style.reserveButton}`).classList.remove(style.showReserveClass);
    //     isSearhMode && document.querySelector(`#${style.searchBox}`).classList.add(style.showSeachClass);
    // }, [isAirplaneLoaded, isSearhMode]);

    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
    }, []);
    useEffect(() => {
        isAirplaneLoaded && reserveButtonRef.current.classList.add(style.showReserveClass);
        isSearhMode && reserveButtonRef.current.classList.remove(style.showReserveClass);
        isSearhMode && searchBoxRef.current.classList.add(style.showSeachClass);
    }, [isAirplaneLoaded, isSearhMode]);

    // 공항 찾기
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

// 공항 검색
useEffect(() => {
    const handleClickOutside = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setSearchTerm('');
        setFilteredAirports(airports);
        setFocusedInput(null);
        setIsEditing({ departure: false, arrival: false }); // Close editing mode
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [airports]);

  const handleSearchTermChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
        setFilteredAirports(
            airports.filter(airport =>
                airport.airportName.toLowerCase().includes(term.toLowerCase()) ||
                airport.airportIso.toLowerCase().includes(term.toLowerCase())
            )
        );
    } else {
        setFilteredAirports(airports);
    }
};

  const handleSelectAirport = (airportCode) => {
    if (focusedInput === 'departure') {
      setDeparture(airportCode);
    } else if (focusedInput === 'arrival') {
      setArrival(airportCode);
    }
    setSearchTerm('');
    setFilteredAirports(airports);
    setFocusedInput(null);
    setIsEditing({ departure: false, arrival: false }); // 편집모드 닫기
  };

  const handleFocus = (inputType) => {
    setFocusedInput(inputType);
    setSearchTerm('');
    setFilteredAirports(airports);
  };

  const handleClickEdit = (inputType) => {
    setIsEditing(prev => ({ ...prev, [inputType]: true }));
    handleFocus(inputType);
  };

  // 날짜
  const handleWayChange = (isRound) => {
    setIsRoundWay(isRound);
    if (!isRound) {
      // 편도로 변경 시 첫 번째 날짜만 유지
      setDates([dates[0]]);
      setDepartureDate(dates[0] ? format(dates[0], 'yyyy-MM-dd') : '');
      setReturnDate('');
    } else {
      // 왕복으로 변경 시 날짜를 다시 설정
      setDates(dates.length === 1 ? [dates[0], dates[0]] : dates);
      setDepartureDate(dates[0] ? format(dates[0], 'yyyy-MM-dd') : '');
      setReturnDate(dates[1] ? format(dates[1], 'yyyy-MM-dd') : '');
    }
  };

    // 날짜 선택 핸들러
      const handleDateChange = (selectedDates) => {

        setDates(selectedDates);
        if (selectedDates.length === 2) {
            console.log(selectedDates);
        } else {
            console.log(selectedDates);
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

    const handleSubmit = () =>{
        navigate('/search', { state: { 
            isRoundWay: isRoundWay ? true : false,
            departure,
            arrival,
            departureDate: dates[0],
            returnDate: isRoundWay ? dates[1] : '',
            adults,
            children,
            infants
        } });
    }

    return (
        <>
        <Header isMain={true}/>
        <div className={style.contentpart}>
            <ThreeScene setIsAirplaneLoaded={setIsAirplaneLoaded} isSearhMode={isSearhMode}/>
            <Box ref={reserveButtonRef} id={style.reserveButton} onClick={() => setIsSearhMode(true)} className="reserveButton">항공권 조회하기</Box>
            <Box ref={searchBoxRef} id={style.searchBox} className="seachBox">
                <div id={style.wayBox}>
                    <div id={style.roundway} onClick={() => handleWayChange(true)} className={isRoundWay ? style.actives : ''}>왕복</div> 
                    <div id={style.oneway} onClick={() => handleWayChange(false)} className={isRoundWay ? '' : style.actives}>편도</div>
                </div>
                <div id={style.selectBox}>
                    <div id={style.airportPart}>
                    <div id={style.depPart}>
                        {isEditing.departure ? (
                        <div className={style.searchAirportContainer}>
                                <div className={style.airportDefault}>{departure || '출발'}</div>
                                <div className={style.searchContainer}>
                            <input
                                className={style.searchAirport}
                                type="text"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    handleSearchTermChange(e);
                                }}
                                onFocus={() => handleFocus('departure')}
                                placeholder="국가, 공항명 검색"
                            />
                            {focusedInput === 'departure' && searchTerm && (
                            <div className={style.autocompleteResults} ref={autocompleteRef}>
                                {filteredAirports.length > 0 ? (
                                    filteredAirports.map((airport) => (
                                        <div
                                            key={airport.airportIso}
                                            onClick={() => handleSelectAirport(airport.airportIso)}
                                        >
                                            {airport.airportName} ({airport.airportIso})
                                        </div>
                                    ))
                                ) : (
                                    <div>No results found</div>
                                )}
                            </div>
                        )}
                        </div>
                        </div>
                        ) : (
                            <div className="editable-div" onClick={() => handleClickEdit('departure')}>
                                <div className={style.airportName}>{departure || '출발'}</div>
                                <div className={style.selectArrow} />
                            </div>
                        )}
                        </div>

                    <div id={style.arrPart}>
                        {isEditing.arrival ? (
                            <div className={style.searchAirportContainer}>
                                 <div className={style.airportDefault}>{arrival || '도착'}</div>
                                 <div className={style.searchContainer}>
                            <input
                                className={style.searchAirport}
                                type="text"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    handleSearchTermChange(e);
                                }}
                                onFocus={() => handleFocus('arrival')}
                                placeholder="국가, 공항명 검색"
                            />
                            {focusedInput === 'arrival' && searchTerm && (
                            <div className={style.autocompleteResults} ref={autocompleteRef}>
                                {filteredAirports.length > 0 ? (
                                    filteredAirports.map((airport) => (
                                        <div
                                            key={airport.airportIso}
                                            onClick={() => handleSelectAirport(airport.airportIso)}
                                        >
                                            {airport.airportName} ({airport.airportIso})
                                        </div>
                                    ))
                                ) : (
                                    <div>No results found</div>
                                )}
                            </div>
                        )}
                            </div>
                            </div>
                        ) : (
                            <div className="editable-div"  onClick={() => handleClickEdit('arrival')} >
                                <div className='airportName'>{arrival || '도착'}</div>
                                <div className={style.selectArrow}/>
                            </div>
                        )}
                    </div>
                    </div>

                    <div className={style.datePart}>
                        {isRoundWay ?
                            (
                                <div className={style.datePickerContainer}>
                                    <Flatpickr
                                    placeholder='날짜를 선택하세요'
                                    options={{ 
                                        mode: "range",
                                    }}
                                    value={dates}
                                    onChange={handleDateChange}
                                    className={style.flatInput}
                                    />
                                </div>
                            )
                            :
                            (
                                <div className={style.datePickerContainer}>
                                <Flatpickr
                                 placeholder='날짜를 선택하세요'
                                        options={{ mode: "single" }}
                                        value={dates}
                                        onChange={handleDateChange}
                                        className={style.flatInput}
                                    />
                                </div>
                            )
                        }
                    </div>
                    
                    <div className={style.peoplePart} ref={menuRef}>
                        <button 
                            className={style.dropdownButton}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {`성인 ${adults}, 소아 ${children}, 유아 ${infants}`}
                        </button>
                        {isMenuOpen && (
                            <div className={style.cntContainer}>
                            <div className={style.cntContainerItem}>
                                <button onClick={() => handleDecrement('adults')}>-</button>
                                <label>성인 </label>
                                <span>{adults}명</span>
                                <button onClick={() => handleIncrement('adults')}>+</button>
                            </div>
                            <div className={style.cntContainerItem}>
                                <button onClick={() => handleDecrement('children')}>-</button>
                                <label>소아 </label>
                                <span>{children}명</span>
                                <button onClick={() => handleIncrement('children')}>+</button>
                            </div>
                            <div className={style.cntContainerItem}>
                                <button onClick={() => handleDecrement('infants')}>-</button>
                                <label>유아 </label>
                                <span>{infants}명</span>
                                <button onClick={() => handleIncrement('infants')}>+</button>
                            </div>
                        </div>
                        )}
                    </div>
                    <div id={style.submitButton} onClick={handleSubmit}>검색</div>
                </div>
            </Box>
        </div>
        </>
    );
};

export default MainPage;
