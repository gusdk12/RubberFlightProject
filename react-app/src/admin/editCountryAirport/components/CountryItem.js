import React from 'react';
import { Button } from '@chakra-ui/react';



const CountryItem = ({ country, onDelete, onNameClick, isActive }) => {
    const { id, countryIso, countryName } = country;

    return (
        <tr className={`countryItem ${isActive ? 'active' : ''}`} onClick={() => onNameClick(id)}>
            <td>O</td>
            <td>{countryIso}</td>
            <td>{countryName}</td>
            <td>
                <Button type="button" onClick={(e) => { e.stopPropagation(); onDelete(countryIso); }}>
                    DELETE
                </Button>
            </td>
        </tr>
    );
};

export default CountryItem;