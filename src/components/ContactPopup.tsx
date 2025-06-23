import { FaTimes } from 'react-icons/fa';
import './ContactPopup.scss';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const phoneIcon = (
    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 512 512" className="contact-icon">
      <path d="M86.5 1.5C75.2 5 72.3 7.4 41.9 37.9c-28 28-29.9 30-33.7 37.8-2.2 4.5-4.9 11.7-5.9 16-2.4 10.7-2.5 33.2 0 46.8C15 208.1 65.6 290.7 143 368.1c78.2 78.3 161.4 129.7 229.5 142 10.1 1.8 14.5 2 27.5 1.6 17.3-.6 23.3-1.8 35-7.4 7-3.4 9.7-5.8 37.6-33.7 26.3-26.3 30.5-30.9 33.3-36.6 7.5-15.4 7.7-31.8.7-46.6-3.5-7.4-5.4-9.5-41.4-45.7-20.7-20.8-40.3-39.8-43.5-42.2-8.6-6.5-15.2-8.8-27.7-9.3-12.2-.5-19.6 1.5-28.7 7.5-9 5.9-12.8 11.1-18.9 25.3-3.8 8.7-8.2 14.7-14.3 19.3-14.4 11-29.9 13.5-47.1 7.7-43.8-14.6-95.4-62.1-117.4-108-5.4-11.4-10.6-28.3-10.6-34.4.2-15.7 12.5-33.9 27.7-40.7 15.8-7.2 18.1-8.5 23.4-13.8 11.6-11.6 16.5-29.7 12.4-45.6-3.4-13.1-5.4-15.5-45-55.4C132 8.2 129 5.7 114.8 1.6c-6.7-1.9-22.4-2-28.3-.1z"></path>
    </svg>
  );

  const smsIcon = (
    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 512 512" className="contact-icon">
      <path d="M58.4 65.9c-20.9 6-37 23.7-41.8 46.1-.5 2.4 6.2 6.8 118.5 79.5 65.5 42.3 119.7 77.1 120.4 77.3.8.2 55.2-34.5 120.9-77 112.9-73 119.5-77.4 119-79.8-5-22.7-21.1-40.3-42.3-46.2-6.2-1.7-15.9-1.8-197.6-1.7-178.1 0-191.4.2-197.1 1.8z"></path>
      <path d="M16 274.6c0 137.4-.4 129.1 6.8 142.8 5 9.6 15 19.4 24.4 24.1 14.2 7-1.6 6.5 208.7 6.5 211.6 0 195.6.5 209.5-6.8 9.1-4.8 19-14.7 23.8-23.8 7.2-13.8 6.8-5.3 6.6-142.6l-.3-123.4L383 224.2c-61.9 40.1-114.7 74.2-117.5 75.8-7.5 4.4-12.3 4.1-21-1.3-3.9-2.4-53.8-34.6-111-71.7-57.2-37-107-69.3-110.7-71.7L16 151v123.6z"></path>
    </svg>
  );

  return (
    <div className="contact-popup-overlay" onClick={onClose}>
      <div className="contact-popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="contact-content">
          <div className="contact-row">
            <div className="contact-half contactgroom">
              <div className="contact-person">
                <div className="contactlabel">신랑</div>
                <div className="contactname">
                  <p>강순원</p>
                </div>
                <div className="contact-actions">
                  <a href="tel:010-9504-0383" className="contact-button">
                    {phoneIcon}
                  </a>
                  <a href="sms:010-9504-0383" className="contact-button">
                    {smsIcon}
                  </a>
                </div>
              </div>
            </div>
            <div className="contact-half contactbride">
              <div className="contact-person">
                <div className="contactlabel">신부</div>
                <div className="contactname">
                  <p>강순투</p>
                </div>
                <div className="contact-actions">
                  <a href="tel:010-9504-0383" className="contact-button">
                    {phoneIcon}
                  </a>
                  <a href="sms:010-9504-0383" className="contact-button">
                    {smsIcon}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-row">
            <div className="contact-half contactgroom">
              <div className="contact-person">
                <div className="contactlabel">신랑 아버지</div>
                <div className="contactname">
                  <p>강순원원</p>
                </div>
                <div className="contact-actions">
                  <a href="tel:010-9504-0383" className="contact-button">
                    {phoneIcon}
                  </a>
                  <a href="sms:010-9504-0383" className="contact-button">
                    {smsIcon}
                  </a>
                </div>
              </div>
            </div>
            <div className="contact-half contactbride">
              <div className="contact-person">
                <div className="contactlabel">신부 아버지</div>
                <div className="contactname">
                  <p>강순투원</p>
                </div>
                <div className="contact-actions">
                  <a href="tel:010-9504-0383" className="contact-button">
                    {phoneIcon}
                  </a>
                  <a href="sms:010-9504-0383" className="contact-button">
                    {smsIcon}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-row">
            <div className="contact-half contactgroom">
              <div className="contact-person">
                <div className="contactlabel">신랑 어머니</div>
                <div className="contactname">
                  <p>강순원쓰</p>
                </div>
                <div className="contact-actions">
                  <a href="tel:010-9504-0383" className="contact-button">
                    {phoneIcon}
                  </a>
                  <a href="sms:010-9504-0383" className="contact-button">
                    {smsIcon}
                  </a>
                </div>
              </div>
            </div>
            <div className="contact-half contactbride">
              <div className="contact-person">
                <div className="contactlabel">신부 어머니</div>
                <div className="contactname">
                  <p>강순투쓰</p>
                </div>
                <div className="contact-actions">
                  <a href="tel:010-9504-0383" className="contact-button">
                    {phoneIcon}
                  </a>
                  <a href="sms:010-9504-0383" className="contact-button">
                    {smsIcon}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;
