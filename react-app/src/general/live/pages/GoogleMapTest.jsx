import React, { useState } from 'react';

const GoogleMapTest = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const sendCoordinatesToIframe = () => {
    const iframe = document.getElementById('map-iframe');
    iframe.contentWindow.postMessage({
      type: 'UPDATE_COORDINATES',
      lat: latitude,
      lng: longitude,
    }, '*');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Latitude:
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            style={{ marginRight: '10px' }}
          />
        </label>
        <label>
          Longitude:
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            style={{ marginRight: '10px' }}
          />
        </label>
        <button onClick={sendCoordinatesToIframe}>Update Map</button>
      </div>
      <div
        style={{ margin: 'auto', position: 'relative', width: '100%', height: '500px', overflow: 'hidden' }}
      >
        <iframe
          id="map-iframe"
          src="/ApiTest.html"
          width="100%"
          height="100%"
          title="Google Map"
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleMapTest;
