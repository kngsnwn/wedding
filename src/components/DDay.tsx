import React, { useState, useEffect } from 'react';
import './DDay.scss';

const DDay: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Wedding date: 2026년 1월 10일 오전 11시
    const weddingDate = new Date('2026-01-10T11:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="editor-section-dday" className="dday-section">
      <div className="wavebg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 65" preserveAspectRatio="xMidYMid meet">
          <g fill="#ffffff" stroke="none" transform="translate(0,65) scale(0.1,-0.1)">
            <path d="M6470 629 c-1061 -34 -2002 -142 -3561 -408 -675 -115 -1198 -174 -1899 -214 -30 -2 2755 -3 6190 -3 3435 0 6225 1 6200 3 -25 1 -126 7 -225 13 -536 32 -1103 100 -1740 210 -737 127 -1570 247 -2110 305 -835 89 -1920 125 -2855 94z"></path>
          </g>
          <g fill="#ffffff" stroke="none" transform="translate(0,65) scale(0.1,-0.1)" className="opacity-50">
            <path d="M0 322 l0 -322 3073 1 c1689 1 3018 5 2952 10 -705 47 -1210 110 -1970 245 -324 57 -1231 193 -1590 238 -665 83 -1301 126 -2117 142 l-348 7 0 -321z"></path>
            <path d="M13880 633 c-743 -17 -1425 -69 -2105 -159 -340 -45 -1173 -172 -1460 -223 -763 -135 -1251 -194 -2020 -244 -27 -2 1335 -4 3028 -5 l3077 -2 0 320 0 320 -207 -2 c-115 -1 -255 -3 -313 -5z"></path>
          </g>
        </svg>
      </div>
      
      <div className="dday-content">
        <div className="countdown-container">
          <div className="ddaybox">
            <div className="counttext">
              <span className="count-number">{timeLeft.days}</span>
              <span className="count-label">Days</span>
            </div>
          </div>
          <span className="colon">:</span>
          <div className="ddaybox">
            <div className="counttext">
              <span className="count-number">{timeLeft.hours}</span>
              <span className="count-label">Hour</span>
            </div>
          </div>
          <span className="colon">:</span>
          <div className="ddaybox">
            <div className="counttext">
              <span className="count-number">{timeLeft.minutes}</span>
              <span className="count-label">Min</span>
            </div>
          </div>
          <span className="colon">:</span>
          <div className="ddaybox">
            <div className="counttext">
              <span className="count-number">{timeLeft.seconds}</span>
              <span className="count-label">Sec</span>
            </div>
          </div>
        </div>
        
        <div className="dday-message">
          <p>
            순원 <span className="heart">♥</span> 순투의 결혼식이{' '}
            <strong>
              <span className="highlight">{timeLeft.days}</span>
            </strong>
            일 남았습니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DDay;