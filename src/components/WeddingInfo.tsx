import './WeddingInfo.scss';

interface WeddingData {
  date: string;
  time: string;
  location: string;
  address: string;
  detailAddress: string;
}

const weddingData: WeddingData = {
  date: '2026년 1월 10일 (토)',
  time: '오전 11시',
  location: '영등포 더컨벤션',
  address: '서울 영등포구 국회대로 38길 2',
  detailAddress: '더컨벤션 2층'
};

export default function WeddingInfo() {
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
          <p>{weddingData.address} </p>
          <p>{weddingData.detailAddress} </p>
        </div>
      </div>

    </div>
  )
}
