import React, { useEffect, useRef, useState } from 'react';
import '../css/search.css';
import { searchFlight } from '../../../apis/flightApis';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import 'flatpickr/dist/flatpickr.min.css';
import Flatpickr from 'react-flatpickr';
import { format } from 'date-fns';

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

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

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



  // 항공권 검색
  const handleSearch = async () => {

    setResults({ outboundFlights: [], inboundFlights: [], combinations: [] });

    try {
      // API 호출
      const combinedResponse = await searchFlight(departure, departureDate, arrival, tripType === "round-trip" ? returnDate : '');
      console.log("될까?", combinedResponse.data);
      setResults(prevResults => ({
        ...prevResults,
        combinations: combinedResponse.data.combinations || [],
        outboundFlights: combinedResponse.data.outboundFlights || []
      }));
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // 메인에서 받은 정보
  useEffect(() => {
    // 전달받은 정보로 상태 설정
    const { state } = location;
    if (state) {
      const { isRoundWay, departure, arrival, departureDate, returnDate, adults, children, infants } = state;

      const formattedDepartureDate = departureDate ? format(new Date(departureDate), 'yyyy-MM-dd') : '';
      const formattedReturnDate = returnDate ? format(new Date(returnDate), 'yyyy-MM-dd') : '';

      setTripType(isRoundWay ? "round-trip" : "one-way" );
      setDeparture(departure);
      setArrival(arrival);
      setDepartureDate(formattedDepartureDate);
      setReturnDate(formattedReturnDate);
      setAdults(adults);
      setChildren(children);
      setInfants(infants);
      console.log(formattedDepartureDate);
      console.log(formattedReturnDate);
    }
  }, [location]);

  useEffect(() => {
    // 검색 수행
    handleSearch();
  }, [tripType, departure, arrival, departureDate, returnDate, passengers]);


  const handleTripTypeChange = (type) => {
    setTripType(type);
    if (type === 'one-way') {
      setReturnDate('');
    }
  };


  return (
    <div className="search-bar">
    <div className="trip-type">
      <button onClick={() => handleTripTypeChange('round-trip')}>왕복</button>
      <button onClick={() => handleTripTypeChange('one-way')}>편도</button>
    </div>
    <div className="input-group">
      <div id='depPart' className="autocomplete-container">
      {isEditing.departure ? (
              <input
                  className='search'
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                      setSearchTerm(e.target.value);
                      handleSearchTermChange(e);
                  }}
                  onFocus={() => handleFocus('departure')}
                  placeholder="출발"
              />
          ) : (
              <div className="editable-div" onClick={() => handleClickEdit('departure')}>
                  <div className='airportName'>{departure || '출발'}</div>
                  <div className='selectArrow' />
              </div>
          )}
          {focusedInput === 'departure' && searchTerm && (
              <div className="autocomplete-results" ref={autocompleteRef}>
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

        <div className="autocomplete-container" id='arrPart'>
        {isEditing.arrival ? (
          <input
              type="text"
              className='search'
              value={searchTerm}
              onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleSearchTermChange(e);
              }}
              onFocus={() => handleFocus('arrival')}
              placeholder="도착"
          />
          ) : (
              <div className="editable-div" onClick={() => handleClickEdit('arrival')}>
                  <div className='airportName'>{arrival || '도착'}</div>
                  <div className='selectArrow' />
              </div>
          )}
          {focusedInput === 'arrival' && searchTerm && (
              <div className="autocomplete-results" ref={autocompleteRef}>
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
        {tripType === 'round-trip' && (
          <div>
            <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
          </div>
        )}
        {tripType === 'one-way' && (
          <div>
            <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
          </div>
        )}
        <div id='peoplePart' ref={menuRef}>
                        <button 
                            className="dropdown-button" 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            value={passengers}
                        >
                            {`성인 ${adults}, 소아 ${children}, 유아 ${infants}`}
                        </button>
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
        <button className='search-button' onClick={handleSearch}>항공권 검색</button>
      </div>
      <div className="search-results">

      { results.combinations.length > 0 && (
        <div>
          <h3>왕복 항공권 조합</h3>
          <ul>
            {results.combinations.map((combination, index) => (
              <li key={index} onClick={() => handleClick(combination)}>
                <div>항공사: {combination.outbound.airlineName} | 출발 공항: {combination.outbound.depAirport} | 도착 공항: {combination.outbound.arrAirport}
                  | 출발 날짜: {combination.outbound.depTime} | 도착 날짜: {combination.outbound.arrTime} | 가격: {combination.outbound.price}
                </div>
                <div>항공사: {combination.inbound.airlineName} | 출발 공항: {combination.inbound.depAirport} | 도착 공항: {combination.inbound.arrAirport}
                  | 출발 날짜: {combination.inbound.depTime} | 도착 날짜: {combination.inbound.arrTime} | 가격: {combination.inbound.price}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
 
      {isRoundWay == false && results.outboundFlights.length > 0 && (
        <div>
          <h3>출발 항공권</h3>
          <ul>
            {results.outboundFlights.map((flight, index) => (
              <li key={index} onClick={() => handleClick(flight)}>
                <div>출발 공항: {flight.depAirport}</div>
                <div>도착 공항: {flight.arrAirport}</div>
                <div>출발 날짜: {flight.depTime}</div>
                <div>도착 날짜: {flight.arrTime}</div>
                <div>가격: {flight.price}</div>
                <div>항공사: {flight.airlineName}</div>
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
