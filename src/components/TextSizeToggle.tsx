import React, { useState, useEffect } from 'react';
import { FaTextHeight } from 'react-icons/fa';
import './TextSizeToggle.scss';

const TextSizeToggle: React.FC = () => {
  const [isLargeText, setIsLargeText] = useState(false);

  useEffect(() => {
    const savedPreference = localStorage.getItem('textSizePreference');
    if (savedPreference === 'large') {
      setIsLargeText(true);
      document.body.classList.add('large-text');
    }
  }, []);

  const toggleTextSize = () => {
    const newIsLargeText = !isLargeText;
    setIsLargeText(newIsLargeText);
    
    if (newIsLargeText) {
      document.body.classList.add('large-text');
      localStorage.setItem('textSizePreference', 'large');
    } else {
      document.body.classList.remove('large-text');
      localStorage.setItem('textSizePreference', 'normal');
    }
  };

  return (
    <button 
      onClick={toggleTextSize}
      className="text-size-toggle"
      aria-label={isLargeText ? '일반 글씨' : '큰 글씨'}
    >
      <FaTextHeight className="text-icon" />
      <span>{isLargeText ? '일반 글씨' : '큰 글씨'}</span>
    </button>
  );
};

export default TextSizeToggle;