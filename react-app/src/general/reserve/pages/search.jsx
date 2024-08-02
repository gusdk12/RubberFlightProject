import React, { useEffect, useState } from 'react';
import '../css/search.css';
import { searchFlight } from '../../../apis/flightApis';
import axios from 'axios';

const Search = () => {
  const [tripType, setTripType] = useState('round-trip');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [results, setResults] = useState({ outboundFlights: [], inboundFlights: [], combinations: [] });
  const [mode, setMode] = useState('combine'); // 현재 모드 설정 ('combine' 또는 'separate')
  const [airports, setAirports] = useState([]); // 공항 데이터
  const [isResultsLoaded, setIsResultsLoaded] = useState(false); // 결과 로드 여부

  useEffect(() => {
    // 공항 데이터를 서버에서 가져오는 useEffect
    axios.get('http://localhost:8282/airport/list')
      .then(response => {
        setAirports(response.data);
      })
      .catch(error => {
        console.error("Error fetching airports:", error);
      });
  }, []);

  const handleSearch = async () => {

    setResults({ outboundFlights: [], inboundFlights: [], combinations: [] });

    try {
      // API 호출
      const combinedResponse = await searchFlight(departure, departureDate, arrival, tripType === 'round-trip' ? returnDate : '', 'combine');
      setResults(prevResults => ({
        ...prevResults,
        combine: combinedResponse.data
      }));

      if (tripType === 'round-trip') {
        const separateResponse = await searchFlight(departure, departureDate, arrival, returnDate, 'separate');
        setResults(prevResults => ({
          ...prevResults,
          separate: separateResponse.data
        }));
      }

      handleModeChange(mode);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    // 검색 수행
    handleSearch();
  }, [tripType, departure, arrival, departureDate, returnDate, passengers]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === 'combine') {
      setResults(prevResults => ({
        ...prevResults,
        ...prevResults.combine
      }));
    } else if (newMode === 'separate') {
      setResults(prevResults => ({
        ...prevResults,
        ...prevResults.separate
      }));
    }
  };

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
        <select 
          value={departure} 
          onChange={(e) => setDeparture(e.target.value)}
          placeholder="출발 공항"
        >
          <option value="" disabled>출발 공항 선택</option>
          {airports.map((airport) => (
            <option key={airport.airportIso} value={airport.airportIso}>
              {airport.airportName} ({airport.airportIso})
            </option>
          ))}
        </select>
        <select 
          value={arrival} 
          onChange={(e) => setArrival(e.target.value)}
          placeholder="도착 공항"
        >
          <option value="" disabled>도착 공항 선택</option>
          {airports.map((airport) => (
            <option key={airport.airportIso} value={airport.airportIso}>
              {airport.airportName} ({airport.airportIso})
            </option>
          ))}
        </select>
        {tripType === 'round-trip' && (
          <div>
            <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)}/>
            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
          </div>
        )}
        {tripType === 'one-way' && (
          <div>
            <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} style={{ width: '265px' }}/>
            <input type="date" value={returnDate} onChange={(e) => setReturnDate("")} hidden/>
          </div>
        )}
                <input type="number" value={passengers} onChange={(e) => setPassengers(e.target.value)} min="1" />
            <button className='search-button' onClick={handleSearch}>항공권 검색</button>
        </div>
      <div className="search-results">
        {/* <h2>항공권 검색 결과</h2> */}
        { tripType === 'round-trip' && (
        <div>
        <select value={mode} onChange={(e) => handleModeChange(e.target.value)}>
          <option value="combine">왕복 동시 선택</option>
          <option value="separate">왕복 따로 선택</option>
        </select>
      </div>
        )}
        {mode === 'combine' && results.combinations && results.combinations.length > 0 && (
          <div>
            <h3>왕복 항공권 조합</h3>
            <ul>
              {results.combinations.map((combination, index) => (
                <li key={index}>
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
        {tripType === 'round-trip' && mode === 'separate' && (
          <>
            {results.outboundFlights && results.outboundFlights.length > 0 && (
              <div>
                <h3>출발 항공권</h3>
                <ul>
                  {results.outboundFlights.map((flight, index) => (
                    <li key={index}>
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
            {results.inboundFlights && results.inboundFlights.length > 0 && (
              <div>
                <h3>도착 항공권</h3>
                <ul>
                  {results.inboundFlights.map((flight, index) => (
                    <li key={index}>
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
          </>
        )}
        {tripType === 'one-way' && results.outboundFlights.length > 0 && (
          <div>
            <h3>출발 항공권</h3>
            <ul>
              {results.outboundFlights.map((flight, index) => (
                <li key={index}>
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
