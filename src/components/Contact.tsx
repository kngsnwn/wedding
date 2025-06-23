import { useState } from 'react';
import { FaPhoneAlt, FaComment } from 'react-icons/fa';
import ContactPopup from './ContactPopup';
import './Contact.scss';

export default function Contact() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <div className="contacts-section">
      <h2 className="contacts-title">연락처</h2>
      <p className="contacts-subtitle">축하의 말씀을 전해주세요</p>
      
      <div className="contact-buttons">
        <button className="contact-button phone" onClick={openPopup}>
          <FaPhoneAlt className="button-icon" />
          <span>연락처 보기</span>
        </button>
      </div>

      <ContactPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
}
