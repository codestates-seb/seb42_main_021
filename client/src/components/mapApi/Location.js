import React, { useEffect } from 'react';
const { kakao } = window;

const Location = ({ location }) => {
  console.log(location[0].title);
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(location[0].lat, location[0].lng),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(
      location[0].lat,
      location[0].lng
    );
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, [location]);

  return (
    <div
      id="myMap"
      style={{
        width: '530px',
        height: '530px',
      }}
    ></div>
  );
};

export default Location;
