import { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio('wedding-music.mp3');
    audioRef.current.loop = true;
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="music-player">
      <button 
        onClick={togglePlay} 
        className="music-button"
        aria-label={isPlaying ? '음악 일시정지' : '음악 재생'}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
        <span>음악 {isPlaying ? '정지' : '재생'}</span>
      </button>
      
      <button 
        onClick={toggleMute} 
        className="music-button"
        aria-label={isMuted ? '음소거 해제' : '음소거'}
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  );
};

export default MusicPlayer;
