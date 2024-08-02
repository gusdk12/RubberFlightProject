import React from 'react';

const CountryItem = ({ country, onDelete }) => {
    const { countryId, countryIso, countryName } = country;

    return (
        <tr>
            <td>{countryId}</td>
            <td>{countryIso}</td>
            <td>{countryName}</td>
            <td>
                <button type="button" onClick={() => onDelete(countryIso)}>DELETE</button> {/* Pass countryIso to onDelete */}
            </td>
        </tr>
    );
};

export default CountryItem;
