import React from 'react';

const CountryItem = ({ country, onDelete }) => {
    const { id, countryId, countryIso, countryName } = country;

    return (
        <tr>
            <td>{id}</td>
            <td>{countryId}</td>
            <td>{countryIso}</td>
            <td>{countryName}</td>
            <td>
                <button type="button" onClick={() => onDelete(countryIso)}>DELETE</button>
            </td>
        </tr>
    );
};

export default CountryItem;
