import React, { useEffect, useRef, useState } from 'react';
import { searchFlight } from '../../../apis/flightApis';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import style from '../css/search.module.css'
import { IoAirplane } from "react-icons/io5";
import { useUser } from '../../user/contexts/LoginContextProvider'; 
import { DatePicker } from 'antd';
import moment from 'moment';

const Search = () => {
  const [passengers, setPassengers] = useState(1);
  const [results, setResults] = useState({ outboundFlights: [], inboundFlights: [], combinations: [] });
  const [selectedFlight, setSelectedFlight] = useState(null);
  // const [isRoundWay, setIsRoundWay] = useState(true);
  const [tripType, setTripType] = useState('round-trip')

 
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [selectedDate, setSelectedDate] = useState(null);

  const [dates, setDates] = useState([]);
  
  const [departure, setDeparture] = useState('ICN');
  const [arrival, setArrival] = useState('');
  const [airports, setAirports] = useState([]); // 공항 데이터
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [isEditing, setIsEditing] = useState({ departure: false, arrival: false }); // For editing state
  const autocompleteRef = useRef(null);
  const [isInputMoved, setIsInputMoved] = useState({ departure: false, arrival: false });

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const location = useLocation();
  const [isSearchReady, setIsSearchReady] = useState(false);
  const navigate = useNavigate();

  // 로그인 여부
  const {isLogin, loginCheck} = useUser();

  const handleClick  = (flight) =>{
    if(!isLogin) {
      window.alert('로그인 후 이용해주세요.');
      navigate('/login');
      return;
    }

    setSelectedFlight(flight);
    const formattedPassengers = `성인 ${adults}명, 소아 ${children}명, 유아 ${infants}명`;
    navigate('/reserve', { state: { 
        flight,
        passengers: formattedPassengers
    } });
}

  useEffect(() => {
    document.body.style.overflowY = 'scroll';
}, []);

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

  // 검색 시 자동 완성
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

  // // timezone 추가
  const handleSelectAirport = (airportCode) => {
    if (focusedInput === 'departure') {
      setDeparture(airportCode);
    } else if (focusedInput === 'arrival') {
      setArrival(airportCode);
    }
    setSearchTerm('');
    setFilteredAirports(airports);
    setFocusedInput(null);
    setIsEditing({ departure: false, arrival: false }); // Close editing mode
  };

  // useEffect(() => {
  //   handleSearch();
  // }, [tripType, departure, arrival, departureDate, returnDate, passengers, depTimezone, arrTimezone]);

  // TEST
  // useEffect(() => {
  //   console.log("Departure Timezone:", depTimezone); // depTimezone 상태 값 확인
  // }, [depTimezone]);

  const handleFocus = (inputType) => {
    setFocusedInput(inputType);
    setSearchTerm('');
    setFilteredAirports(airports);
  };

  const handleClickEdit = (inputType) => {
    setIsEditing(prev => ({ ...prev, [inputType]: true }));
    setIsInputMoved(prev => ({ ...prev, [inputType]: !prev[inputType] }));
    handleFocus(inputType);
  };

  // 날짜
  // 날짜를 형식화하여 상태를 업데이트
  const handleDateChange = (dates) => {
    if (tripType === "round-trip") {
      if (Array.isArray(dates) && dates.length === 2) {
        setDateRange(dates);
        setDepartureDate(dates[0] ? dates[0].format('YYYY-MM-DD') : '');
        setReturnDate(dates[1] ? dates[1].format('YYYY-MM-DD') : '');
      } else {
        setDateRange([null, null]);
        setDepartureDate('');
        setReturnDate('');
      }
    } else {
      setDateRange([dates[0], null]);
      setDepartureDate(dates[0] ? dates[0].format('YYYY-MM-DD') : '');
      setReturnDate('');
    }
  };


  const handleOneWayDateChange = (date) => {
    if (tripType === "one-way") {
      setDepartureDate(date ? date.format('YYYY-MM-DD') : '');
      setSelectedDate(date ? date.format('YYYY-MM-DD') : null);
    }
  };


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

  // 메인에서 받은 정보
  useEffect(() => {
    // 전달받은 정보로 상태 설정
    const { state } = location;
    if (state) {
      const { isRoundWay, departure, arrival, departureDate, returnDate, adults, children, infants } = state;

      // if (departureDate) {
      //   const parsedReturnDate = returnDate ? returnDate : null;
      //   setDates(parsedReturnDate ? [departureDate, parsedReturnDate] : [departureDate]);
      // }

      const depDate = departureDate ? moment(departureDate, 'YYYY-MM-DD') : null;
      const retDate = returnDate ? moment(returnDate, 'YYYY-MM-DD') : null;


      if (isRoundWay) {
        setDateRange(depDate && retDate ? [depDate, retDate] : [depDate]);
        setDepartureDate(depDate ? depDate.format('YYYY-MM-DD') : '');
        setReturnDate(retDate ? retDate.format('YYYY-MM-DD') : '');
      } else {
        setDates([depDate]);
        setDepartureDate(depDate ? depDate.format('YYYY-MM-DD') : '');
        setReturnDate('');
        setSelectedDate(depDate);
        
      }

      setTripType(isRoundWay ? "round-trip" : "one-way" );
      setDeparture(departure);
      setArrival(arrival);
      setAdults(adults);
      setChildren(children);
      setInfants(infants);
      setDepartureDate(departureDate);
      setReturnDate(returnDate);
      setIsSearchReady(true); 
     console.log(departureDate);
     console.log(returnDate);
      console.log(departure);
      console.log(arrival);
    }
  },  [location]);

  useEffect(() => {
    if (isSearchReady && departure && arrival && departureDate) {
      handleSearch();
      setIsSearchReady(false); // 검색 후 플래그 리셋
    }
  }, [isSearchReady, departure, arrival, departureDate]);

  // 항공권 검색
  // timezone
  const handleSearch = async () => {
    // const formattedDepartureDate = format(new Date(dates[0]), 'yyyy-MM-dd');
    // const formattedReturnDate = dates[1] ? format(new Date(dates[1]), 'yyyy-MM-dd') : '';

    console.log("출발일", departureDate);
    console.log("도착일", returnDate);
    console.log("출발지", departure);
    console.log("도착지", arrival);
    setResults({ outboundFlights: [], inboundFlights: [], combinations: [] });

    try {
      // API 호출
      const combinedResponse = await searchFlight(departure, departureDate, arrival, tripType === "round-trip" ? returnDate : '');
      console.log("될까?", combinedResponse.data);
      setResults(prevResults => ({
        ...prevResults,
        combinations: combinedResponse.data.combinations || [],
        outboundFlights: combinedResponse.data.outboundFlights || []
      }
    ))
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleTripTypeChange = (type) => {
    setTripType(type);
    if (type === 'round-trip') {
      setDates(dates.length === 1 ? [dates[0], dates[0]] : dates);
      setDepartureDate(dates[0] ? format(dates[0], 'yyyy-MM-dd') : '');
      setReturnDate(dates[1] ? format(dates[1], 'yyyy-MM-dd') : '');
    } else if (type === 'one-way') {
      setDates([dates[0]]);
      setDepartureDate(dates[0] ? format(dates[0], 'yyyy-MM-dd') : '');
      setReturnDate('');
    }
  };


  // 비행기 이름 처리
  const getFormattedAirlineName = (airlineName) => {
    const indexOfParenthesis = airlineName.indexOf('(');
    return indexOfParenthesis !== -1 ? airlineName.substring(0, indexOfParenthesis).trim() : airlineName;
  };

  return (
    <div className={style.searchBar}>
    <div className={style.contentpart}>
      <div className={style.wayBox}> 
      <button onClick={() => handleTripTypeChange('round-trip')} className={`${style.wButton} ${tripType === 'round-trip' ? style.searchActives : ''}`}>왕복</button>
      <button onClick={() => handleTripTypeChange('one-way')} className={`${style.wButton} ${tripType === 'one-way' ? style.searchActives : ''}`}>편도</button>
      </div>
    <div className={style.selectBox}>
      <div id={style.searchAirport}>
      <div id={style.searchDepPart}>
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

        <div id={style.searchArrPart}>
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

      <div className={style.DatePart}>
        {tripType === 'round-trip' && (
          <div className={style.datePickerContainer}>
           <DatePicker.RangePicker 
            format="YYYY-MM-DD" 
            onChange={handleDateChange} 
            value={dateRange}
            placeholder='날짜를 선택하세요'
          />
       </div>
        )}
        {tripType === 'one-way' && (
          <div className={style.datePickerContainer}>
           <DatePicker
            format="YYYY-MM-DD"
            onChange={handleOneWayDateChange}
            placeholder='날짜를 선택하세요'
            value={selectedDate}
           />
         {/* {selectedDate && <div>선택된 날짜: {selectedDate}</div>} */}
          </div>
        )}
        </div>
        <div className={style.peoplePart} ref={menuRef}>
          <button 
              className={style.dropdownButton}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              value={passengers}
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
        <div className={style.submit}>
        <button className={style.subButton} onClick={handleSearch}>항공권 검색</button>
        </div>              
      </div>
      </div>

      <div className={style.results}>
      {tripType == "round-trip" && results.combinations.length > 0 && (
         <div className={style.resultsContents}>
          {/* <h3>왕복 항공권 조합</h3> */}
          <ul>
            {results.combinations.map((combination, index) => (
              <li key={index} onClick={() => handleClick(combination)}>
                 <div className={style.flights}>
                  <div className={style.flightInfo}>
                    <div className={style.flightAirline}>
                    {getFormattedAirlineName(combination.outbound.airlineName) === getFormattedAirlineName(combination.inbound.airlineName) 
                    ? getFormattedAirlineName(combination.outbound.airlineName)
                    : (
                      <>
                        <div>{getFormattedAirlineName(combination.outbound.airlineName)}</div>
                        <div>{getFormattedAirlineName(combination.inbound.airlineName)}</div>
                      </>
                        )}
                    </div>
                    <div className={style.flightTimes}>
                      <div className={style.flightDepTime}>
                        {combination.outbound.depTime}
                        <div className={style.depAirport}>{combination.outbound.depAirport}</div>
                      </div>
                      <div className={style.flightArrTime}>
                        {combination.outbound.arrTime}
                        <div className={style.arrAirport}>{combination.outbound.arrAirport}</div>
                      </div>
                    </div>
                    <div className={style.airplane}>
                      <div className={style.airplane1}><IoAirplane /></div>
                      <IoAirplane />
                    </div>
                    <div className={style.flightTimes2}>
                      <div className={style.flightDepTime}>
                        {combination.inbound.depTime}
                        <div className={style.depAirport}>{combination.inbound.depAirport}</div>
                      </div>
                      <div className={style.flightArrTime}>
                        {combination.inbound.arrTime}
                        <div className={style.arrAirport}>{combination.inbound.arrAirport}</div>
                      </div>
                    </div>
                    <div className={style.flightTakeTimes}>
                      <div className={style.flightTakeTime}>{combination.outbound.takeTimeFormat}</div>
                      <div className={style.flightTakeTime}>{combination.inbound.takeTimeFormat}</div>
                      </div>
                  </div>
                  <div className={style.flightPrice}>
                    <div className={style.verticalLine}></div>
                    <div className={style.totalPrice}>
                      왕복 {(combination.outbound.price + combination.inbound.price).toLocaleString('ko-KR')}원
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
      </div>
      )}
 
      {tripType == "one-way" && results.outboundFlights.length > 0 && (
           <div className={style.resultsContents}>
          {/* <h3>출발 항공권</h3> */}
          <ul>
            {results.outboundFlights.map((flight, index) => (
              <li key={index} onClick={() => handleClick(flight)}>
                <div className={style.flightInfo}>
                  <div className={style.flightAirline}>{flight.airlineName}</div>
                  <div className={style.flightDepTime}>{flight.depTime}<div className={style.depAirport}>{flight.depAirport}</div></div>
                  <div className={style.flightArrTime}>{flight.arrTime}<div className={style.arrAirport}>{flight.arrAirport}</div></div>
                  <div className={style.flightTakeTime}>{flight.takeTimeFormat}</div>
                  <div className={style.verticalLine}></div>
                  <div className={style.flightPrice}>{flight.priceFormat}원</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
  );
};

export default Search;
