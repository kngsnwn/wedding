import React, { useEffect } from 'react';
import { shareToKakao, shareToWeb, copyToClipboard, initKakao } from '../utils/kakao';
import { addToKakaoCalendar } from '../utils/kakaoCalendar';
import './ShareModal.scss';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    // 모달이 열릴 때 Kakao SDK 초기화
    if (isOpen) {
      initKakao();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const shareKakaoCalendar = async () => {
    if (!window.Kakao) {
      alert('카카오 SDK가 로드되지 않았습니다.');
      return;
    }

    try {
      await addToKakaoCalendar();
    } catch (error) {
      console.error('카카오 캘린더 등록 실패:', error);
      alert('카카오 캘린더 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };


  const handleShare = (platform: string) => {
    switch (platform) {
      case 'kakao':
        // 개선된 카카오톡 공유
        shareToKakao();
        break;
      
      case 'web':
        // 웹 공유 API 사용
        shareToWeb();
        break;
    }
  };

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div className="share-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button-x" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="share-content">
          <div className="share-grid">
            <div className="share-item" onClick={() => handleShare('kakao')}>
              <div className="share-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12">
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.678l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.471.471 0 0 0 0 .222V13.5a.472.472 0 0 0 .944 0v-1.363l.427-.413 1.428 2.033a.472.472 0 1 0 .773-.543l-1.514-2.155zm-2.958 1.924h-1.46V9.297a.472.472 0 0 0-.943 0v4.159c0 .26.21.472.471.472h1.932a.472.472 0 1 0 0-.944zm-5.857-1.092l.696-1.707.638 1.707H9.092zm2.523.488l.002-.016a.469.469 0 0 0-.127-.32l-1.046-2.8a.69.69 0 0 0-.627-.474.696.696 0 0 0-.653.447l-1.661 4.075a.472.472 0 0 0 .874.357l.33-.813h2.07l.299.8a.472.472 0 1 0 .884-.33l-.345-.926zM8.293 9.302a.472.472 0 0 0-.471-.472H4.577a.472.472 0 1 0 0 .944h1.16v3.736a.472.472 0 0 0 .944 0V9.774h1.14c.261 0 .472-.212.472-.472z"></path>
                  </g>
                </svg>
              </div>
              <div className="share-label">카카오톡</div>
            </div>

            <div className="share-item" onClick={() => handleShare('web')}>
              <div className="share-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16.08 18 16.08z"/>
                </svg>
              </div>
              <div className="share-label">공유하기</div>
            </div>

            <div className="share-item" onClick={shareKakaoCalendar}>
              <div className="share-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zm0-12H5V5h14v2zM7 11h5v5H7z"/>
                </svg>
              </div>
              <div className="share-label">카카오 캘린더</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;