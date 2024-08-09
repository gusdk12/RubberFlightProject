import React, { useEffect, useRef, useState } from 'react';
import '../css/flatpickr.css';
import { searchFlight } from '../../../apis/flightApis';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import 'flatpickr/dist/flatpickr.min.css';
import Flatpickr from 'react-flatpickr';
import { format } from 'date-fns';
import style from '../css/search.module.css'

const Search = () => {
  const [passengers, setPassengers] = useState(1);
  const [results, setResults] = useState({ outboundFlights: [], inboundFlights: [], combinations: [] });
  const [selectedFlight, setSelectedFlight] = useState(null);

  const [isRoundWay, setIsRoundWay] = useState(true);
  const [tripType, setTripType] = useState('round-trip')

  const [dates, setDates] = useState([]);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  
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

  // 시간 계산
  const convertMinutesToHoursAndMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}시간 ${remainingMinutes}분`;
  };

  const handleClick = (flight) => {
    setSelectedFlight(flight); // 클릭된 항공권 정보를 상태에 저장
    navigate(`/reserve/${flight.id}`, { 
      state: {
        flight,
        departure,
        arrival,
        passengers
     } }); // `reserve` 페이지로 이동
  };

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
const handleDateChange = (selectedDates) => {
  setDates(selectedDates);
  if (selectedDates.length === 2) {
    setDepartureDate(format(selectedDates[0], 'yyyy-MM-dd'));
    setReturnDate(format(selectedDates[1], 'yyyy-MM-dd'));
  } else if (selectedDates.length === 1) {
    setDepartureDate(format(selectedDates[0], 'yyyy-MM-dd'));
    setReturnDate('');
  } else {
    setDepartureDate('');
    setReturnDate('');
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

      if (departureDate) {
        const parsedReturnDate = returnDate ? returnDate : null;
        setDates(parsedReturnDate ? [departureDate, parsedReturnDate] : [departureDate]);
      }

    const formattedDepartureDate = format(new Date(departureDate), 'yyyy-MM-dd');
    const formattedReturnDate = returnDate ? format(new Date(returnDate), 'yyyy-MM-dd') : '';

      setTripType(isRoundWay ? "round-trip" : "one-way" );
      setDeparture(departure);
      setArrival(arrival);
      setAdults(adults);
      setChildren(children);
      setInfants(infants);
      setDepartureDate(formattedDepartureDate);
      setReturnDate(formattedReturnDate);
      setIsSearchReady(true); 
      console.log("날짜포맷", formattedDepartureDate);
      console.log("날짜포맷2", formattedReturnDate);
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
           <Flatpickr
           placeholder='날짜를 선택하세요'
           options={{ 
               mode: "range",
           }}
           value={dates}
           onChange={handleDateChange}
           className={style.searchFlatpickrInput}
           />
       </div>
        )}
        {tripType === 'one-way' && (
          <div className={style.datePickerContainer}>
          <Flatpickr
           placeholder='날짜를 선택하세요'
                  options={{ mode: "single" }}
                  value={dates}
                  onChange={handleDateChange}
                  className={style.searchFlatpickrInput}
              />
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
                <div>항공사: {combination.outbound.airlineName} | 출발 공항: {combination.outbound.depAirport} | 도착 공항: {combination.outbound.arrAirport}
                  | 출발 날짜: {combination.outbound.depTime} | 도착 날짜: {combination.outbound.arrTime} | 가격: {combination.outbound.price} | 출발 timezone: {combination.outbound.depTimezone} 
                  | 도착 timezone: {combination.outbound.arrTimezone}| 소요시간: {combination.outbound.takeTime}
                </div>
                <div>항공사: {combination.inbound.airlineName} | 출발 공항: {combination.inbound.depAirport} | 도착 공항: {combination.inbound.arrAirport}
                  | 출발 날짜: {combination.inbound.depTime} | 도착 날짜: {combination.inbound.arrTime} | 가격: {combination.inbound.price} | 출발 timezone: {combination.inbound.depTimezone} |
                  도착 timezone: {combination.inbound.arrTimezone} | 소요시간: {combination.inbound.takeTime}
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
