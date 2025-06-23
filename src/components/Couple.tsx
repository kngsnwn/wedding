import React from 'react';
import { FaHeart } from 'react-icons/fa';
import './Couple.scss';

const Couple: React.FC = () => {
  return (
    <div className="couple-section">
      <h2>신랑 &amp; 신부</h2>
      <div className="portrait-area" data-aos="fade-up">
        <div className="portrait-image">
          {/* <img 
            src="images/couple1.png" 
            alt="신랑" 
            draggable="false"
            className="portrait"
          /> */}
        </div>
        
        <div className="heart-icon">
          <FaHeart />
        </div>
        
        <div className="portrait-image">
          {/* <img 
            src="images/couple2.JPG" 
            alt="신부" 
            draggable="false"
            className="portrait"
          /> */}
        </div>
      </div>
      
      <div className="couple-names">
        <span className="label groom">신랑</span>
        <span className="name-text">강순원</span>
        <span className="label bride">신부</span>
        <span className="name-text">강순원</span>
      </div>
    </div>
  );
};

export default Couple;
