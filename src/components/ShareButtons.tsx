import React, { useEffect } from 'react';
import { FaShare, FaCopy, FaComment } from 'react-icons/fa';
import { shareToKakao, shareToWeb, copyToClipboard, initKakao } from '../utils/kakao';
import './ShareButtons.scss';

const ShareButtons: React.FC = () => {
  useEffect(() => {
    // 컴포넌트 마운트 시 Kakao SDK 초기화
    initKakao();
  }, []);

  return (
    <div className="share-buttons">
      <h3 className="share-title">청첩장 공유하기</h3>
      <div className="share-button-group">
        <button 
          className="share-button kakao"
          onClick={shareToKakao}
          aria-label="카카오톡으로 공유하기"
        >
          <FaComment className="share-icon" />
          <span>카카오톡</span>
        </button>
        
        <button 
          className="share-button web"
          onClick={shareToWeb}
          aria-label="다른 앱으로 공유하기"
        >
          <FaShare className="share-icon" />
          <span>공유하기</span>
        </button>
        
        <button 
          className="share-button copy"
          onClick={copyToClipboard}
          aria-label="링크 복사하기"
        >
          <FaCopy className="share-icon" />
          <span>링크 복사</span>
        </button>
      </div>
      
      <p className="share-description">
        소중한 분들과 함께 이 기쁨을 나누어주세요
      </p>
    </div>
  );
};

export default ShareButtons;