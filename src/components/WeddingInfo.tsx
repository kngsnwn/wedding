import './WeddingInfo.scss';
// import NaverMap from './NaverMap';  // Naver Map 주석 처리

interface WeddingData {
  date: string;
  time: string;
  location: string;
  address: string;
  mapUrl: string;
  mapLat: number;
  mapLng: number;
  detailAddress: string;
}

const weddingData: WeddingData = {
  date: '2026년 1월 10일 (토)',
  time: '오전 11시',
  location: '영등포 더컨벤션',
  address: '서울 영등포구 국회대로 38길 2',
  detailAddress: '더컨벤션 2층',
  mapUrl: 'https://map.naver.com/p/search/%EB%8D%94%EC%BB%A8%EB%B2%A4%EC%85%98%20%EC%98%81%EB%93%B1%ED%8F%AC/place/1241035074?placePath=/home?entry=pll&from=nx&fromNxList=true&fromPanelNum=2&timestamp=202506221827&locale=ko&svcName=map_pcv5&searchText=%EB%8D%94%EC%BB%A8%EB%B2%A4%EC%85%98%20%EC%98%81%EB%93%B1%ED%8F%AC&searchType=place&c=15.00,0,0,0,dh',
  mapLat: 37.517331,
  mapLng: 126.903379
};

export default function WeddingInfo() {
  const startNavigation = (app: string) => {
    const { mapLat, mapLng, location, address } = weddingData;
    const fullAddress = `${address} ${location}`;
    
    if (app === 'tmap') {
      window.open(`tmap://route?goalx=${mapLng}&goaly=${mapLat}&goalname=${encodeURIComponent(location)}`);
    } else if (app === 'kakao') {
      window.open(`kakaomap://route?ep=${mapLat},${mapLng}&by=PUBLIC_TRANSIT&e=${encodeURIComponent(location)}`);
    } else {
      window.open(`https://m.map.naver.com/search2/search.nhn?query=${encodeURIComponent(fullAddress)}`);
    }
  };

  return (
    <div className="wedding-info-section">
      <div className="wedding-details">
        <h2>결혼식 정보</h2>
        <div className="info-item">
          <h3>일시</h3>
          <p>{weddingData.date}</p>
          <p>{weddingData.time}</p>
        </div>
        <div className="info-item">
          <h3>장소</h3>
          <p>{weddingData.location}</p>
          <p>{weddingData.address}</p>
        </div>
      </div>

      <div className="map-container">
        <h3>오시는 길</h3>
        {/* 네이버 맵 주석 처리
        <div className="map-wrapper">
          <NaverMap 
            lat={weddingData.mapLat} 
            lng={weddingData.mapLng} 
            title={weddingData.location}
            height="300px"
          />
        </div>
        */}
        <div className="address-info">
          <p><strong>주소:</strong> {weddingData.address} {weddingData.detailAddress}</p>
        </div>
        <div className="navigation-buttons">
          <a 
            href={`https://map.naver.com/v5/directions/-/14128810.8030116,4509984.1040156,15.3,0,0,0,dh`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="navi-button naver"
            title="네이버지도로 길찾기"
          >
            <span className="navi-icon">🌐</span>네이버지도
          </a>
          <button 
            onClick={() => startNavigation('kakao')} 
            className="navi-button kakao"
            title="카카오맵으로 길찾기"
          >
            <span className="navi-icon">🧭</span>카카오맵
          </button>
          <button 
            onClick={() => startNavigation('tmap')} 
            className="navi-button tmap"
            title="티맵으로 길찾기"
          >
            <span className="navi-icon">🚗</span>티맵
          </button>
        </div>
      </div>
      
      <div className="transportation-info">
        <h4>대중교통 안내</h4>
        <div className="transportation-section">
          <h5>🚇 지하철</h5>
          <ul>
            <li><strong>2, 5호선 영등포구청역</strong> 4번 출구에서 도보 3분</li>
          </ul>
        </div>
        
        <div className="transportation-section">
          <h5>🚌 버스</h5>
          <ul>
            <li><strong>일반</strong> 5</li>
            <li><strong>간선</strong> 670</li>
            <li><strong>지선</strong> 5620, 6631, 6637</li>
            <li><strong>마을</strong> 영등포02, 12</li>
            <li><strong>광역</strong> 2500</li>
          </ul>
        </div>
        
        <div className="transportation-section">
          <h5>🚗 자가용</h5>
          <ul>
            <li><strong>주소</strong> 서울 영등포구 국회대로38길 2 (당산동 3가 93-2)</li>
            <li><strong>네비게이션</strong> "영등포 더컨벤션" 검색</li>
            <li><strong>주차안내</strong></li>
              <li>지하 주차장 정산 X </li>
              <li>공영 주차장 2시간 무료 </li>
              <li>조선선재 주차장 : 도보 8분 </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
