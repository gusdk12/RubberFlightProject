import React, { useState, useEffect } from 'react';
import { getCountryInfo } from '../../apis/countryApis';
import axios from 'axios';
import CountryItem from './components/CountryItem';

const AdminPage = () => {
    const [countrys, setCountry] = useState([]); // Initialize country list
    const [countryIsoInput, setCountryIsoInput] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null); // State to hold selected country info

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

    const searchCountry = async (e) => {
        e.preventDefault();

        if (!countryIsoInput) {
            window.alert("ISO 코드를 입력해주세요.");
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
            setSelectedCountry(extractedData); // Set the selected country info
        } catch (error) {
            console.error("Error fetching country data:", error);
            window.alert("데이터를 가져오는 중 오류가 발생했습니다.");
        }
    };

    const deleteCountry = async (isoCode) => {
        console.log("Deleting country with ISO Code:", isoCode); // Debugging
        if (!isoCode) {
            window.alert("삭제할 ISO 코드를 제공해주세요.");
            return;
        }

        try {
            const response = await axios({
                method: "delete",
                url: `http://localhost:8282/country/delete/${isoCode}`,
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const { status } = response;
            if (status === 200) {
                window.alert('삭제 성공');
                setCountry(countrys.filter(country => country.codeIso2Country !== isoCode)); // Remove the deleted country from the list
                setSelectedCountry(null); // Clear the selected country info
            } else {
                window.alert('삭제 실패');
            }
        } catch (error) {
            console.error("Error deleting country:", error);
            window.alert('삭제 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <form onSubmit={searchCountry}>
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
                <button type="submit" name="search">Search</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>나라 id</th>
                        <th>나라 iso 코드</th>
                        <th>나라 이름</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {countrys.map(country => (
                        <CountryItem
                            key={country.countryId}
                            country={country}
                            onDelete={() => deleteCountry(country.countryIso)} // Pass delete function with isoCode
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
