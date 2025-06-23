import React from 'react';
import './Family.scss';

const Family: React.FC = () => {
  return (
    <section id="editor-section-family" className="family-section">
      <div className="wavebg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 65" preserveAspectRatio="xMidYMid meet">
          <g fill="#f9f9f9" stroke="none" transform="translate(0,65) scale(0.1,-0.1)">
            <path d="M6470 629 c-1061 -34 -2002 -142 -3561 -408 -675 -115 -1198 -174 -1899 -214 -30 -2 2755 -3 6190 -3 3435 0 6225 1 6200 3 -25 1 -126 7 -225 13 -536 32 -1103 100 -1740 210 -737 127 -1570 247 -2110 305 -835 89 -1920 125 -2855 94z"></path>
          </g>
          <g fill="#f9f9f9" stroke="none" transform="translate(0,65) scale(0.1,-0.1)" className="opacity-50">
            <path d="M0 322 l0 -322 3073 1 c1689 1 3018 5 2952 10 -705 47 -1210 110 -1970 245 -324 57 -1231 193 -1590 238 -665 83 -1301 126 -2117 142 l-348 7 0 -321z"></path>
            <path d="M13880 633 c-743 -17 -1425 -69 -2105 -159 -340 -45 -1173 -172 -1460 -223 -763 -135 -1251 -194 -2020 -244 -27 -2 1335 -4 3028 -5 l3077 -2 0 320 0 320 -207 -2 c-115 -1 -255 -3 -313 -5z"></path>
          </g>
        </svg>
      </div>
      
      <div className="family-content">
        <div className="section-family-area-1">
          <div className="family-parents">
            <div className="family-father">강순원원</div>
          </div>
          <div className="family-middot">·</div>
          <div className="family-parents">
            <div className="family-mother">강순원투</div>
          </div>
          <div className="family-no-parent">의</div>
          <div className="family-relationship">아들</div>
          <div className="family-child">
            <div className="family-name">
              <p>순원</p>
            </div>
          </div>
        </div>
        
        <div className="section-family-area-2">
          <div className="family-parents">
            <div className="family-father">강순투원</div>
          </div>
          <div className="family-middot">·</div>
          <div className="family-parents">
            <div className="family-mother">강순투투</div>
          </div>
          <div className="family-no-parent">의</div>
          <div className="family-relationship">딸</div>
          <div className="family-child">
            <div className="family-name">
              <p>순투</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Family;