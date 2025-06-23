import React, { useEffect } from 'react';
import Couple from './components/Couple';
import WeddingInfo from './components/WeddingInfo';
import DDay from './components/DDay';
import Calendar from './components/Calendar';
import PhotoGallery from './components/PhotoGallery';
import Location from './components/Location';
import Contact from './components/Contact';
import BankTransfer from './components/BankTransfer';
import GuestBook from './components/GuestBook';
import CoverImage from './components/CoverImage';
import InvitationMessage from './components/InvitationMessage';
import Family from './components/Family';
import FloatingControls from './components/FloatingControls';
import ClosingMessage from './components/ClosingMessage';
import { initKakao } from './utils/kakao';
import './App.scss';

function App() {
  useEffect(() => {
    // 앱 시작시 Kakao SDK 초기화
    initKakao();
  }, []);

  return (
    <div className="app">
      <FloatingControls />
      <main className="invitation-container">
        <div className="section cover-section">
          <CoverImage />
        </div>
        <div className="section">
          <InvitationMessage />
        </div>
        <div className="section">
          <Family />
        </div>
        <div className="section">
          <Couple />
        </div>
        {/*<div className="section">*/}
        {/*  <WeddingInfo />*/}
        {/*</div>*/}
        <div className="section">
          <DDay />
        </div>
        <div className="section">
          <Calendar />
        </div>
        <div className="section">
          <PhotoGallery />
        </div>
        <div className="section">
          <Location />
        </div>
        <div className="section">
          <Contact />
        </div>
        <div className="section">
          <BankTransfer />
        </div>
        <div className="section">
          <GuestBook />
        </div>
        <div className="section">
          <ClosingMessage />
        </div>
      </main>
    </div>
  );
}

export default App;
