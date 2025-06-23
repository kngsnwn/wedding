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
    groom: false,
    bride: false
  });

  const groomAccounts: AccountInfo[] = [
    {
      name: '강순원',
      bank: '하나',
      number: '117-891770-28107',
      relation: '신랑'
    },
    {
      name: '강순원원',
      bank: '농협',
      number: '453065-56-032166',
      relation: '아버지'
    },
    {
      name: '강순원투',
      bank: '하나',
      number: '655-082594-00108',
      relation: '어머니'
    }
  ];

  const brideAccounts: AccountInfo[] = [
    {
      name: '강순투',
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
    // 계좌번호만 추출하고 하이픈 제거
    const accountNumber = text.split(' ').pop() || '';
    const cleanAccountNumber = accountNumber.replace(/-/g, '');

    navigator.clipboard.writeText(cleanAccountNumber);
    setCopied(accountType);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bank-transfer-section">
      <h2 className="section-title">마음전하실곳</h2>
      <div data-aos="fade-up"
           className="account section-account-area-1 pb-12 whitespace-pre-wrap TmoneyRoundWind aos-init aos-animate">
        <p>참석이 어려워 직접 축하를 전하지 못하는</p>
        <p>분들을 위해 계좌번호를 기재하였습니다.</p>
        <p>넓은 마음으로 양해 부탁드립니다.</p>
        <p>전해주시는 진심은 소중하게 간직하여</p>
        <p>좋은 부부의 모습으로 보답하겠습니다.</p>
      </div>
      <div className={`account-section ${expandedSections.groom ? 'expanded' : ''}`}>
        <div
          className="section-header"
          onClick={() => toggleSection('groom')}
        >
          <span>신랑측</span>
          {expandedSections.groom ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        <div className="account-list">
          {expandedSections.groom && (
            groomAccounts.map((account, index) => (
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
            ))
          )}
        </div>
      </div>

      <div className={`account-section ${expandedSections.bride ? 'expanded' : ''}`}>
        <div
          className="section-header"
          onClick={() => toggleSection('bride')}
        >
          <span>신부측</span>
          {expandedSections.bride ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        <div className="account-list">
          {expandedSections.bride && (
            brideAccounts.map((account, index) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BankTransfer;