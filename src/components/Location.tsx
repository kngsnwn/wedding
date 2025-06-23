import React, { useEffect, useRef } from 'react';
import './Location.scss';

declare global {
  interface Window {
    kakao: any;
  }
}

interface WeddingData {
  location: string;
  address: string;
  mapUrl: string;
  mapLat: number;
  mapLng: number;
  detailAddress: string;
}

const weddingData: WeddingData = {
  location: '영등포 더컨벤션',
  address: '서울 영등포구 국회대로 38길 2',
  detailAddress: '더컨벤션 2층',
  mapUrl: 'https://map.naver.com/p/search/%EB%8D%94%EC%BB%A8%EB%B2%A4%EC%85%98%20%EC%98%81%EB%93%B1%ED%8F%AC/place/1241035074?placePath=/home?entry=pll&from=nx&fromNxList=true&fromPanelNum=2&timestamp=202506221827&locale=ko&svcName=map_pcv5&searchText=%EB%8D%94%EC%BB%A8%EB%B2%A4%EC%85%98%20%EC%98%81%EB%93%B1%ED%8F%AC&searchType=place&c=15.00,0,0,0,dh',
  mapLat: 37.517331,
  mapLng: 126.903379
};

const handleNavigation = (type: 'naver' | 'kakao' | 'tmap') => {
  const { location, address, mapLat, mapLng } = weddingData;
  
  switch (type) {
    case 'naver':
      window.open(`https://map.naver.com/p/search/${encodeURIComponent(location)}/place/1241035074`, '_blank');
      break;
    case 'kakao':
      window.open(`https://map.kakao.com/link/search/${encodeURIComponent(location)}`, '_blank');
      break;
    case 'tmap':
      const tmapUrl = `tmap://search?name=${encodeURIComponent(location)}&coordinate=${mapLng},${mapLat}`;
      const fallbackUrl = `https://apis.openapi.sk.com/tmap/app/routes/search?goalname=${encodeURIComponent(location)}&goalx=${mapLng}&goaly=${mapLat}`;
      
      try {
        window.location.href = tmapUrl;
        setTimeout(() => {
          window.open(fallbackUrl, '_blank');
        }, 1000);
      } catch {
        window.open(fallbackUrl, '_blank');
      }
      break;
  }
};

const copyAddress = async () => {
  const fullAddress = `${weddingData.address} (${weddingData.detailAddress})`;
  try {
    await navigator.clipboard.writeText(fullAddress);
    alert('주소가 복사되었습니다.');
  } catch (err) {
    const textArea = document.createElement('textarea');
    textArea.value = fullAddress;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('주소가 복사되었습니다.');
  }
};

export default function Location() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          const options = {
            center: new window.kakao.maps.LatLng(weddingData.mapLat, weddingData.mapLng),
            level: 3
          };

          const map = new window.kakao.maps.Map(mapRef.current, options);
          
          const markerPosition = new window.kakao.maps.LatLng(weddingData.mapLat, weddingData.mapLng);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition
          });
          
          marker.setMap(map);

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${weddingData.location}</div>`
          });
          
          infowindow.open(map, marker);
        }
      });
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="location-section">
      <div className="map-container">
        <h3>오시는 길</h3>
        
        <div className="address-info">
          <div className="address-text">
            <p><strong>{weddingData.location}</strong></p>
            <p>{weddingData.address}</p>
            <p>{weddingData.detailAddress}</p>
          </div>
          <button className="copy-address-btn" onClick={copyAddress}>
            주소 복사
          </button>
        </div>

        <div id="kakao-map" ref={mapRef} className="kakao-map"></div>

        <div className="navigation-buttons custom-navi-buttons">
          <div className="navi-btn-wrap">
            <div className="navi-btn" onClick={() => handleNavigation('naver')}>
              <img src="https://cdn2.makedear.com/homepage/img/icon/navermap1.webp" draggable="false" className="navi-icon-sm" />
              <span>네이버지도</span>
            </div>
            <div className="navi-divider"></div>
            <div className="navi-btn" onClick={() => handleNavigation('kakao')}>
              <img src="https://cdn2.makedear.com/homepage/img/icon/kakaonavi1.png" draggable="false" className="navi-icon-sm" />
              <span>카카오내비</span>
            </div>
            <div className="navi-divider"></div>
            <div className="navi-btn" onClick={() => handleNavigation('tmap')}>
              <img src="https://cdn2.makedear.com/homepage/img/icon/tmap1.png" draggable="false" className="navi-icon-sm" />
              <span>티맵</span>
            </div>
          </div>
        </div>
      </div>

      <div className="transportation-info">
        <h3>대중교통 안내</h3>
        <div className="transportation-section">
          <h4>🚇 지하철</h4>
          <ul>
            <li>
              <strong>2, 5호선 영등포구청역</strong> 4번 출구에서 도보 3분
            </li>
          </ul>
        </div>

        <div className="transportation-section">
          <h5>🚌 버스</h5>
          <ul>
            <li>
              <strong>일반</strong> 5
            </li>
            <li>
              <strong>간선</strong> 670
            </li>
            <li>
              <strong>지선</strong> 5620, 6631, 6637
            </li>
            <li>
              <strong>마을</strong> 영등포02, 12
            </li>
            <li>
              <strong>광역</strong> 2500
            </li>
          </ul>
        </div>

        <div className="transportation-section">
          <h5>🚗 자가용</h5>
          <ul>
            <li>
              <strong>주소</strong> 서울 영등포구 국회대로38길 2 <br /> (당산동 3가 93-2)
            </li>
            <li>
              <strong>네비게이션</strong> "영등포 더컨벤션" 검색
            </li>
            <li>
              <strong>주차안내</strong>
            </li>
            <li>지하 주차장 - 정산 X </li>
            <li>공영 주차장 - 2시간 무료 </li>
            <li>조선선재 주차장 - 도보 8분 </li>
          </ul>
        </div>
      </div>
    </div>
  )
}