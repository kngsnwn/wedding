import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaCopy, FaCheck } from 'react-icons/fa';
import './BankTransfer.scss';

interface AccountInfo {
  name: string;
  bank: string;
  number: string;
  relation: string;
}

const BankTransfer = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    groom: true,
    bride: true
  });

  const groomAccounts: AccountInfo[] = [
    {
      name: '강순원',
      bank: '하나',
      number: '117-891770-28107',
      relation: '신랑'
    },
    {
      name: '강순원투',
      bank: '농협',
      number: '453065-56-032166',
      relation: '아버지'
    },
    {
      name: '강순원쓰리',
      bank: '하나',
      number: '655-082594-00108',
      relation: '어머니'
    }
  ];

  const brideAccounts: AccountInfo[] = [
    {
      name: '강순트',
      bank: '카카오뱅크',
      number: '3333-04-1234567',
      relation: '신부'
    },
    {
      name: '강순투원',
      bank: '국민은행',
      number: '012-3456-7890',
      relation: '아버지'
    },
    {
      name: '강순투투',
      bank: '신한은행',
      number: '110-456-789012',
      relation: '어머니'
    }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const copyToClipboard = (text: string, accountType: string) => {
    navigator.clipboard.writeText(text);
    setCopied(accountType);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bank-transfer-section">
      <h2 className="section-title">마음전하실곳</h2>
      
      <div className="account-section">
        <div 
          className="section-header" 
          onClick={() => toggleSection('groom')}
        >
          <span>신랑측</span>
          {expandedSections.groom ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        
        {expandedSections.groom && (
          <div className="account-list">
            {groomAccounts.map((account, index) => (
              <div key={`groom-${index}`} className="account-item">
                <div className="account-info">
                  <div className="account-relation">{account.relation}</div>
                  <div className="account-name">{account.name}</div>
                </div>
                <div className="account-details">
                  <div className="bank-name">{account.bank}</div>
                  <div className="account-number">{account.number}</div>
                  <button 
                    className={`copy-button ${copied === `${account.bank}-${account.number}` ? 'copied' : ''}`}
                    onClick={() => copyToClipboard(
                      `${account.bank} ${account.number}`, 
                      `${account.bank}-${account.number}`
                    )}
                    aria-label="계좌번호 복사"
                  >
                    {copied === `${account.bank}-${account.number}` ? (
                      <><FaCheck className="icon" /> 복사완료</>
                    ) : (
                      <><FaCopy className="icon" /> 복사</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="account-section">
        <div 
          className="section-header" 
          onClick={() => toggleSection('bride')}
        >
          <span>신부측</span>
          {expandedSections.bride ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        
        {expandedSections.bride && (
          <div className="account-list">
            {brideAccounts.map((account, index) => (
              <div key={`bride-${index}`} className="account-item">
                <div className="account-info">
                  <div className="account-relation">{account.relation}</div>
                  <div className="account-name">{account.name}</div>
                </div>
                <div className="account-details">
                  <div className="bank-name">{account.bank}</div>
                  <div className="account-number">{account.number}</div>
                  <button 
                    className={`copy-button ${copied === `${account.bank}-${account.number}` ? 'copied' : ''}`}
                    onClick={() => copyToClipboard(
                      `${account.bank} ${account.number}`, 
                      `${account.bank}-${account.number}`
                    )}
                    aria-label="계좌번호 복사"
                  >
                    {copied === `${account.bank}-${account.number}` ? (
                      <><FaCheck className="icon" /> 복사완료</>
                    ) : (
                      <><FaCopy className="icon" /> 복사</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="closing-message">
        <div className="divider"></div>
        <p>소중한 마음 감사드립니다</p>
        <div className="signature">강순원 · 강순투 드림</div>
      </div>
    </div>
  );
};

export default BankTransfer;
