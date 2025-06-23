import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

interface NaverMapProps {
  lat: number;
  lng: number;
  title: string;
  height?: string;
  zoom?: number;
}

const NaverMap: React.FC<NaverMapProps> = ({ 
  lat, 
  lng, 
  title, 
  height = '300px',
  zoom = 16 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.naver) return;

      const location = new window.naver.maps.LatLng(lat, lng);
      
      const mapOptions = {
        center: location,
        zoom: zoom,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
        },
      };

      const map = new window.naver.maps.Map(mapRef.current, mapOptions);
      
      // Add marker
      new window.naver.maps.Marker({
        position: location,
        map: map,
        title: title,
      });
    };

    // Load Naver Maps script
    if (!document.getElementById('naver-maps')) {
      const script = document.createElement('script');
      script.id = 'naver-maps';
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}`;
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else if (window.naver) {
      initMap();
    }
  }, [lat, lng, title, zoom]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: height,
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }} 
    />
  );
};

export default NaverMap;
