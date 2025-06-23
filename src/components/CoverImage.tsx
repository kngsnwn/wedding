import React from 'react';
import './CoverImage.scss';

const CoverImage: React.FC = () => {
  return (
    <section className="cover-section">
      <div className="cover-effects">
        <img 
          src="https://cdn2.makedear.com/homepage/img/effect/new1/1.png" 
          alt="" 
          className="effect-overlay"
        />
      </div>
      
      <div className="cover-names">
        <div className="name-left">KANG SOON WON</div>
        <div className="name-right">KANG SOON TWO</div>
      </div>

      <div className="cover-content">
        <div className="main-title">We are<br />getting married</div>
        <div className="wedding-date">JAN 10, 2026</div>
        <div className="wedding-message">
          <p>We, who have similar smiles, are getting married.</p>
          <p>Holding onto each other's clasped hands lightly we promise to live happily ever after.</p>
        </div>
      </div>

      <div className="cover-image-container">
        <div className="noise-overlay"></div>
        <img 
          src="./images/cover.PNG"
          alt="Wedding Cover" 
          className="cover-main-image"
        />
        <div className="blend-overlay"></div>
      </div>
    </section>
  );
};

export default CoverImage;
