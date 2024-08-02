import React, { useState, useEffect } from 'react';
import { getCountryInfo } from '../../apis/countryApis';
import { getAirportInfo } from '../../apis/airportApis';
import axios from 'axios';
import CountryItem from './components/CountryItem';
import AirportItem from './components/AirportItem';

const AdminPage = () => {
    const [countrys, setCountry] = useState([]);
    const [countryIsoInput, setCountryIsoInput] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);

    const [airports, setAirport] = useState([]);
    const [airportIataInput, setAirportIataInput] = useState("");
    const [selectedAirport, setSelectedAirport] = useState(null);

    // 나라 목록 가져오기
    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:8282/country/list",
        })
        .then(response => {
            const { data, status } = response;
            if (status === 200) {
                setCountry(data);
            }
        })
        .catch(error => {
            console.error("Error fetching country list:", error);
        });
    }, []);

    // 공항 목록 가져오기
    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:8282/airport/list",
        })
        .then(response => {
            const { data, status } = response;
            if (status === 200) {
                setAirport(data);
            }
        })
        .catch(error => {
            console.error("Error fetching airport list:", error);
        });
    }, []);

    const addCountry = async (e) => {
        e.preventDefault();

        console.log(countryIsoInput);

        if (!countryIsoInput) {
            window.alert("ISO 코드를 입력해주세요.");
            return;
        }

        // 중복 확인
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
            setSelectedCountry(extractedData);

            // Country 저장하기
            const saveResponse = await axios({
                method: 'post',
                url: 'http://localhost:8282/country/add',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: extractedData,
            });

            if (saveResponse.status !== 200) {
                throw new Error('저장시 오류 발생');
            }

            window.alert('저장 성공');
            setCountry([...countrys, extractedData]); // 새 나라를 목록에 추가

        } catch (error) {
            console.error("Error fetching or saving country data:", error);
            window.alert("데이터를 가져오거나 저장하는 중 오류가 발생했습니다.");
        }
    };

    const deleteCountry = async (countryIso) => {
        if (!countryIso) {
            window.alert("삭제할 나라 ID를 제공해주세요.");
            return;
        }

        try {
            const response = await axios({
                method: "delete",
                url: `http://localhost:8282/country/delete/${countryIso}`,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                window.alert('삭제 성공');
                setCountry(countrys.filter(country => country.countryIso !== countryIso)); 
                setSelectedCountry(null); 
            } else {
                window.alert('삭제 실패');
            }
        } catch (error) {
            console.error("Error deleting country:", error);
            window.alert('삭제 중 오류가 발생했습니다.');
        }
    };

    const addAirport = async (e) => {
        e.preventDefault();

        console.log(airportIataInput);
    
        if(!airportIataInput) {
            window.alert("IATA 코드를 입력해주세요.");
            return;
        }
    
        // 중복 확인
        const existingAirport = airports.find(airport => airport.airportIso === airportIataInput);
        if (existingAirport) {
            window.alert("해당 IATA 코드는 이미 존재합니다.");
            return;
        }
    
        try {
            // Fetch airport information
            const response = await getAirportInfo(airportIataInput);
            const data = response.data[0];
    
            // Find the associated country information using countryIso
            const country = countrys.find(country => country.countryIso === data.codeIso2Country);
            if (!country) {
                window.alert("해당 IATA 코드에 해당하는 나라 정보를 찾을 수 없습니다.");
                return;
            }
    
            // Extract relevant airport and country data
            const extractedData = {
                airportId: data.airportId,
                countryIso: data.codeIso2Country,
                airportName: data.nameAirport,
                airportIso: data.codeIataAirport,
                latitudeAirport: data.latitudeAirport,
                longitudeAirport: data.longitudeAirport,
                country: {
                    id: country.id
                }
            };
    
            setSelectedAirport(extractedData);
    
            // Save airport along with the associated country data
            const saveResponse = await axios({
                method: 'post',
                url: 'http://localhost:8282/airport/add',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: extractedData,
            });
    
            if (saveResponse.status !== 200) {
                throw new Error('저장시 오류 발생');
            }
    
            window.alert('저장 성공');
            setAirport([...airports, extractedData]); // 새 공항을 목록에 추가
    
        } catch (error) {
            console.error("Error fetching or saving airport data:", error);
            window.alert("데이터를 가져오거나 저장하는 중 오류가 발생했습니다.");
        }
    };
    

    const deleteAirport = async (airportIso) => {
        if (!airportIso) {
            window.alert("삭제할 공항 IATA 코드를 제공해주세요.");
            return;
        }
    
        try {
            const response = await axios({
                method: "delete",
                url: `http://localhost:8282/airport/delete/${airportIso}`,
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            if (response.status === 200) {
                window.alert('삭제 성공');
                setAirport(airports.filter(airport => airport.airportIso !== airportIso));
                setSelectedAirport(null);
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
            {/* 나라 정보 추가, 삭제 */}
            <div>
                <form onSubmit={addCountry}>
                    <div>
                        <div>나라 입력</div>
                        <input
                            type="text"
                            placeholder="나라 ISO 코드 입력하기"
                            name="countryIso"
                            value={countryIsoInput}
                            onChange={(e) => setCountryIsoInput(e.target.value)}
                        />
                    </div>
                    <button type="submit" name="search">Country Add</button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>id |</th>
                            <th>나라 id |</th>
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
                                onDelete={() => deleteCountry(country.countryIso)} // 수정된 부분
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <br/><br/>
            <hr/>
            <br/><br/>

            {/* 공항 정보 추가, 삭제 */}
            <div>
                <form onSubmit={addAirport}>
                    <div>
                        <div>공항 입력</div>
                        <input
                            type="text"
                            placeholder="공항 Iata 코드 입력하기"
                            name="airportIata"
                            value={airportIataInput}
                            onChange={(e) => setAirportIataInput(e.target.value)}
                        />
                    </div>
                    <button type="submit" name="search">Airport Add</button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>id |</th>
                            <th>나라 Iso 코드 |</th>
                            <th>공항 id |</th>
                            <th>공항 Iata 코드 |</th>
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
                                onDelete={() => deleteAirport(airport.airportIso)} // 수정된 부분
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminPage;
