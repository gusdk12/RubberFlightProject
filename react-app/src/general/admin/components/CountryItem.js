import React from 'react';
import {Button} from '@chakra-ui/react';

const CountryItem = ({ country, onDelete, onNameClick}) => {
    const { id, countryId, countryIso, countryName } = country;

    return (
        <tr>
            <td>{id}</td>
            <td>{countryId}</td>
            <td>{countryIso}</td>
            <td key={id} onClick={()=>onNameClick(id)}>{countryName}</td>
            <td>
                <Button type="button" onClick={() => onDelete(countryIso)}>DELETE</Button>
            </td>
        </tr>
    );
};

export default CountryItem;