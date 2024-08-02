import React from 'react';

const AirportItem = ({ airport, onDelete }) => {
    const { id, airportId ,airportIso, airportName, latitudeAirport, longitudeAirport} = airport;

    return (
        <tr>
            <td>{id}</td>
            <td>{airportId}</td>
            <td>{airportIso}</td>
            <td>{airportName}</td>
            <td>{latitudeAirport}</td>
            <td>{longitudeAirport}</td>
            <td>
                <button type="button" onClick={() => onDelete(airportIso)}>DELETE</button>
            </td>
        </tr>
    );
};

export default AirportItem;
