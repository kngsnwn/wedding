import React from 'react';
import './InvitationMessage.scss';

const InvitationMessage: React.FC = () => {
  return (
    <section className="invitation-message-section">
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
      
      <h2 className="section-label">
        <div>Invite you</div>
      </h2>
      
      <div className="section-post-paragraph-area">
        <div className="message-content">
          <p>웃는 모습이 예쁜 그녀와</p>
          <p>그 웃는 모습을 유난히 좋아하는 그</p>
          <p>시간이 흘러 언제나 함께 웃을 수 있는 하나가 되려 합니다.</p>
          <p>귀한 걸음 하시어 축복해 주시면</p>
          <p>저희에게 더 없는 큰 기쁨이 되겠습니다.</p>
        </div>
      </div>
    </section>
  );
};

export default InvitationMessage;
