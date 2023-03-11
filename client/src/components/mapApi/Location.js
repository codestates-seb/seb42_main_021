import React, { useEffect } from 'react';
const { kakao } = window;

const Location = () => {
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);

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
