import React, { useState, useEffect } from 'react';
import { database, hasFirebaseConfig } from '../firebase/config';
import { ref, push, onValue, remove, update, query, orderByChild } from 'firebase/database';
import './GuestBook.scss';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  date: string;
  timestamp: number;
  password?: string;
}

const GuestBook: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    password: ''
  });

  // Firebase 실시간 데이터 리스너 설정
  useEffect(() => {
    if (!hasFirebaseConfig || !database) {
      setLoading(false);
      setError('Firebase가 설정되지 않았습니다. 방명록 기능을 사용할 수 없습니다.');
      return;
    }

    const guestbookRef = ref(database, 'guestbook');
    const orderedQuery = query(guestbookRef, orderByChild('timestamp'));
    
    const unsubscribe = onValue(orderedQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const entriesArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => b.timestamp - a.timestamp); // 최신순 정렬
        setEntries(entriesArray);
      } else {
        setEntries([]);
      }
      setLoading(false);
      setError(null);
    }, (error) => {
      console.error('Firebase 데이터 로드 오류:', error);
      setError('방명록을 불러오는데 실패했습니다.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleWriteClick = () => {
    setShowWriteForm(true);
    setEditingId(null);
    setFormData({ name: '', message: '', password: '' });
  };

  const handleEditClick = (entry: GuestbookEntry) => {
    const password = prompt('비밀번호를 입력하세요:');
    if (password === entry.password || (!entry.password && password === '')) {
      setEditingId(entry.id);
      setShowWriteForm(true);
      setFormData({
        name: entry.name,
        message: entry.message,
        password: entry.password || ''
      });
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleDeleteClick = async (entry: GuestbookEntry) => {
    const password = prompt('비밀번호를 입력하세요:');
    if (password === entry.password || (!entry.password && password === '')) {
      if (confirm('정말 삭제하시겠습니까?')) {
        try {
          const entryRef = ref(database, `guestbook/${entry.id}`);
          await remove(entryRef);
        } catch (error) {
          console.error('삭제 오류:', error);
          alert('삭제에 실패했습니다. 다시 시도해주세요.');
        }
      }
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasFirebaseConfig || !database) {
      alert('Firebase가 설정되지 않아 방명록 기능을 사용할 수 없습니다.');
      return;
    }
    
    if (!formData.name.trim() || !formData.message.trim()) {
      alert('이름과 메시지를 입력해주세요.');
      return;
    }

    const now = new Date();
    const timestamp = now.getTime();
    const dateString = `${now.getFullYear().toString().slice(2)}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    try {
      if (editingId) {
        // 기존 항목 수정
        const entryRef = ref(database, `guestbook/${editingId}`);
        await update(entryRef, {
          name: formData.name.trim(),
          message: formData.message.trim(),
          password: formData.password
        });
      } else {
        // 새 항목 추가
        const guestbookRef = ref(database, 'guestbook');
        await push(guestbookRef, {
          name: formData.name.trim(),
          message: formData.message.trim(),
          date: dateString,
          timestamp: timestamp,
          password: formData.password
        });
      }

      setFormData({ name: '', message: '', password: '' });
      setShowWriteForm(false);
      setEditingId(null);
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleCancel = () => {
    setShowWriteForm(false);
    setEditingId(null);
    setFormData({ name: '', message: '', password: '' });
  };

  return (
    <section className="guestbook-section">
      <div className="section-box">
        <h2 className="section-title">Guest book</h2>
        <h1 className="subtitle">방명록</h1>
        <div className="section-line-div">
          <hr className="section-line" />
        </div>
        <div className="description">
          <p>따뜻한 마음이 담긴 축하의 글을 남겨주시면</p>
          <p>소중한 추억으로 간직하겠습니다.</p>
        </div>
      </div>

      <div className="section-guestbook-area-1">
        <div className="guestbook-container">
          {loading && (
            <div className="loading-message">
              <p>방명록을 불러오는 중...</p>
            </div>
          )}
          
          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={() => window.location.reload()} className="retry-button">
                다시 시도
              </button>
            </div>
          )}
          
          {!loading && !error && !showWriteForm && (
            <div className="guestbook-write-button">
              <div 
                className="style-button3 write-button"
                onClick={handleWriteClick}
              >
                <span>글쓰기</span>
              </div>
            </div>
          )}

          {showWriteForm && (
            <form className="guestbook-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="이름"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  maxLength={20}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="비밀번호 (수정/삭제시 필요)"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  maxLength={20}
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="축하 메시지를 남겨주세요"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  maxLength={200}
                  rows={4}
                  required
                />
              </div>
              <div className="form-buttons">
                <button type="submit" className="submit-button">
                  {editingId ? '수정하기' : '등록하기'}
                </button>
                <button type="button" className="cancel-button" onClick={handleCancel}>
                  취소
                </button>
              </div>
            </form>
          )}

          <ul className="board-list">
            {entries.map((entry) => (
              <li key={entry.id} className="guestbook-item">
                <div className="guestbook-content">
                  <div className="guestbook-header">
                    <span className="nameleading">{entry.name}</span>
                    <div className="guestbook-edit-button">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditClick(entry)}
                      >
                        <span>수정</span>
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteClick(entry)}
                      >
                        <span>삭제</span>
                      </button>
                    </div>
                  </div>
                  <div className="guestbook-message">
                    <div className="message-text">
                      {entry.message}
                    </div>
                  </div>
                  <div className="guestbook-footer">
                    <span className="guestbookdate">
                      <span>{entry.date}</span>
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default GuestBook;