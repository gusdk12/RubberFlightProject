import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCountryInfo } from '../../apis/countryApis';
import { getAirportInfo } from '../../apis/airportApis';
import CountryItem from './components/CountryItem';
import AirportItem from './components/AirportItem';
import { InputGroup, Input, InputRightElement, Button, Select, FormControl, FormLabel, Box, Flex, Text } from '@chakra-ui/react';

import './CSS/AdminPage.css';

const AdminPage = () => {
    const [countrys, setCountry] = useState([]);
    const [countryIsoInput, setCountryIsoInput] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);

    const [airports, setAirport] = useState([]);
    const [airportIataInput, setAirportIataInput] = useState("");

    // 전체 나라 목록 가져오기
    const fetchCountries = async () => {
        try {
            const response = await axios.get("http://localhost:8282/country/list");
            const { data, status } = response;
            if (status === 200) {
                setCountry(data);
            }
        } catch (error) {
            console.error("Error fetching country list:", error);
        }
    };

    // 선택한 나라의 공항 목록 가져오기
    const fetchAirportsByCountry = async (countryId) => {
        try {
            const response = await axios.get(`http://localhost:8282/airport/detail/${countryId}`);
            const { data, status } = response;
            if (status === 200) {
                setAirport(data);
            }
        } catch (error) {
            console.error("Error fetching airport list:", error);
        }
    };

    // 컴포넌트 마운트 시 나라 목록 가져오기
    useEffect(() => {
        fetchCountries();
    }, []);

    // 나라 클릭 시 해당 나라의 공항 목록 불러오기
    const handleCountryClick = (countryId) => {
        setSelectedCountry(countrys.find(country => country.id === countryId));
        fetchAirportsByCountry(countryId);
    };

    // 나라 추가
    const addCountry = async (e) => {
        e.preventDefault();

        if (!countryIsoInput) {
            window.alert("ISO 코드를 입력해주세요.");
            return;
        }

        const existingCountry = countrys.find(country => country.countryIso === countryIsoInput);
        if (existingCountry) {
            window.alert("해당 ISO 코드는 이미 존재합니다.");
            return;
        }

        try {
            const response = await getCountryInfo(countryIsoInput);
            const data = response.data[0];

            const extractedData = {
                countryId: data.countryId,
                countryIso: data.codeIso2Country,
                countryName: data.nameCountry,
            };

            const saveResponse = await axios.post('http://localhost:8282/country/add', extractedData, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (saveResponse.status === 200) {
                window.alert('저장 성공');
                await fetchCountries(); // 목록을 다시 가져와서 UI를 업데이트합니다.
                setSelectedCountry(null); // 새로 추가한 나라가 없으므로 선택된 나라를 초기화합니다.
            } else {
                window.alert('저장 실패');
            }

        } catch (error) {
            console.error("Error fetching or saving country data:", error);
            window.alert("데이터를 가져오거나 저장하는 중 오류가 발생했습니다.");
        }finally {
            setCountryIsoInput(''); // 폼 제출 후 입력 필드 초기화
        }
    };

    // 나라 삭제
    const deleteCountry = async (countryIso) => {
        if (!countryIso) {
            window.alert("삭제할 나라 ID를 제공해주세요.");
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8282/country/delete/${countryIso}`, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200) {
                window.alert('삭제 성공');
                await fetchCountries(); // 목록을 다시 가져와서 UI를 업데이트합니다.
                setSelectedCountry(null);
            } else {
                window.alert('삭제 실패');
            }
        } catch (error) {
            console.error("Error deleting country:", error);
            window.alert('삭제 중 오류가 발생했습니다.');
        }
    };

    // 공항 추가
    const addAirport = async (e) => {
        e.preventDefault();
    
        if (!airportIataInput || !selectedCountry) {
            window.alert("IATA 코드와 선택한 나라를 입력해주세요.");
            return;
        }
    
        const existingAirport = airports.find(airport => airport.airportIso === airportIataInput);
        if (existingAirport) {
            window.alert("해당 IATA 코드는 이미 존재합니다.");
            return;
        }
    
        try {
            const response = await getAirportInfo(airportIataInput, selectedCountry.countryIso);
            const data = response.data[0];
    
            if (!data) {
                window.alert("해당 IATA 코드에 대한 공항 정보를 찾을 수 없습니다.");
                return;
            }
    
            const extractedData = {
                airportId: data.airportId,
                countryIso: data.codeIso2Country,
                airportName: data.nameAirport,
                airportIso: data.codeIataAirport,
                latitudeAirport: data.latitudeAirport,
                longitudeAirport: data.longitudeAirport,
                country: { id: selectedCountry.id },
            };
    
            const saveResponse = await axios.post('http://localhost:8282/airport/add', extractedData, {
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (saveResponse.status === 200) {
                window.alert('저장 성공');
                await fetchAirportsByCountry(selectedCountry.id); // 선택한 나라의 공항 목록을 다시 가져옴
            } else {
                window.alert('저장 실패');
            }
    
        } catch (error) {
            console.error("Error fetching or saving airport data:", error);
            window.alert("데이터를 가져오거나 저장하는 중 오류가 발생했습니다.");
        } finally {
            setAirportIataInput(''); // 폼 제출 후 입력 필드 초기화
        }
    };

    // 공항 삭제
    const deleteAirport = async (airportIso) => {
        if (!airportIso) {
            window.alert("삭제할 공항 IATA 코드를 제공해주세요.");
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8282/airport/delete/${airportIso}`, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200) {
                window.alert('삭제 성공');
                await fetchAirportsByCountry(selectedCountry.id); // 선택한 나라의 공항 목록을 다시 가져와서 UI를 업데이트합니다.
                setAirport(prev => prev.filter(airport => airport.airportIso !== airportIso)); // 현재 공항 목록에서 삭제
            } else {
                window.alert('삭제 실패');
            }
        } catch (error) {
            console.error("Error deleting airport:", error);
            window.alert('삭제 중 오류가 발생했습니다.');
        }
    };

    return (
        <>
            <div className='topBox'>
            {/* 나라 정보 추가, 삭제 */}
                <div className='countryBox'>
                    <form onSubmit={addCountry}>
                        <div>COUNTRY</div>
                        <div>
                            <Input
                                id="countryInput"
                                type="text"
                                placeholder="나라 ISO 코드 입력하기"
                                name="countryIso"
                                value={countryIsoInput}
                                onChange={(e) => setCountryIsoInput(e.target.value)}
                            />
                            <Button type="submit" name="search" id='countryButton'>Country Add</Button>
                        </div>
                    </form>

                    <table>
                        <thead>
                            <tr>
                                <th>안전성 |</th>
                                <th>나라 iso 코드 |</th>
                                <th>나라 이름 |</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {countrys.map(country => (
                                <CountryItem
                                    key={country.countryId}
                                    country={country}
                                    onDelete={() => deleteCountry(country.countryIso)}
                                    onNameClick={() => handleCountryClick(country.id)} 
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 공항 정보 추가, 삭제 */}
                <div className='airportBox'>
                    <form onSubmit={addAirport}>
                        <div>AIRPORT</div>
                        <div>
                            <Input
                                id="airportInput"
                                type="text"
                                placeholder='공항 Iata 코드 입력하기'
                                _placeholder={{ opacity: 1, color: 'gray.500' }}
                                name="airportIata"
                                value={airportIataInput}
                                onChange={(e) => setAirportIataInput(e.target.value)}
                            />
                            <Button type="submit" name="search" id='airportButton'>Airport Add</Button>
                        </div>
                    </form>
                    <div className="clear"></div>
                    <table>
                        <thead>
                            <tr>
                                <th>나라 Iso |</th>
                                <th>공항 Iata |</th>
                                <th>공항 이름 |</th>
                                <th>공항 위도 |</th>
                                <th>공항 경도 |</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {airports.map(airport => (
                                <AirportItem
                                    key={airport.airportId}
                                    airport={airport}
                                    onDelete={() => deleteAirport(airport.airportIso)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AdminPage;
