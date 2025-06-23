import React, { useState } from 'react';
import { FaShare } from 'react-icons/fa';
import TextSizeToggle from './TextSizeToggle';
import MusicPlayer from './MusicPlayer';
import ShareModal from './ShareModal';
import './FloatingControls.scss';

const FloatingControls: React.FC = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };

  return (
    <>
      <div className="floating-controls">
        <div className="controls-container">
          <button className="share-button" onClick={handleShareClick}>
            <FaShare />
            <span>공유</span>
          </button>
          <TextSizeToggle />
          <MusicPlayer />
        </div>
      </div>
      <ShareModal isOpen={isShareModalOpen} onClose={handleCloseShareModal} />
    </>
  );
};

export default FloatingControls;
