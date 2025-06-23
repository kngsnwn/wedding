import React from 'react';
import './CoupleInfo.scss';

interface CoupleMember {
  name: string;
  image: string;
  description: string;
}

const CoupleInfo: React.FC = () => {
  const coupleMembers: CoupleMember[] = [
    {
      name: '신랑 이름',
      image: '', // 'images/groom.jpg',
      description: '신랑의 간단한 소개 문구'
    },
    {
      name: '신부 이름',
      image: '', // 'images/bride.jpg',
      description: '신부의 간단한 소개 문구'
    }
  ];

  return (
    <div className="couple-info">
      <h2 className="section-title">신랑 신부 소개</h2>
      <div className="couple-info__grid">
        {coupleMembers.map((member, index) => (
          <div key={index} className="couple-info__card">
            {/* {member.image && <img src={member.image} alt={member.name} className="couple-info__image" />} */}
            <h3>{member.name}</h3>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoupleInfo;
