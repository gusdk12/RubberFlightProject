import React from 'react';
import { InputGroup, Input, InputRightElement, Button, Select, FormControl, FormLabel, Box, Flex, Text } from '@chakra-ui/react';

const AirportItem = ({ airport, onDelete }) => {
    const { id, countryIso, airportId ,airportIso, airportName, latitudeAirport, longitudeAirport} = airport;

    return (
        <tr>
            <td>{countryIso}</td>
            <td>{airportIso}</td>
            <td>{airportName}</td>
            {/* <td>{latitudeAirport}</td>
            <td>{longitudeAirport}</td> */}
            <td>
                <Button type="button" onClick={() => onDelete(airportIso)}>DELETE</Button>
            </td>
        </tr>
    );
};

export default AirportItem;
