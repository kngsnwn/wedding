import React from 'react';
import './Calendar.scss';

const Calendar: React.FC = () => {
  const weddingDate = new Date(2026, 0, 10); // 2026년 1월 10일 (월은 0부터 시작)
  const month = weddingDate.getMonth();
  const year = weddingDate.getFullYear();
  const weddingDay = weddingDate.getDate();

  // 해당 월의 첫 번째 날과 마지막 날 구하기
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // 첫 번째 날의 요일 (0: 일요일, 1: 월요일, ...)
  const firstDayOfWeek = firstDay.getDay();
  
  // 해당 월의 총 일수
  const daysInMonth = lastDay.getDate();
  
  // 달력 셀 배열 생성
  const calendarCells = [];
  
  // 첫 주의 빈 셀들
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarCells.push(null);
  }
  
  // 실제 날짜들
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <section className="calendar-section">
      <h2 className="section-title">Calendar</h2>
      
      <div className="wedding-date-info">
        <div className="date-text">2026년 1월 10일 토요일 오전 11시</div>
        <div className="venue-text">영등포 더 컨벤션 2층</div>
      </div>

      <div className="calendar-container">
        <table className="calendar-table">
          <thead>
            <tr>
              {dayNames.map((day, index) => (
                <th key={index} className={index === 0 ? 'sunday' : ''}>
                  <div>{day}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil(calendarCells.length / 7) }, (_, weekIndex) => (
              <tr key={weekIndex}>
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const cellIndex = weekIndex * 7 + dayIndex;
                  const day = calendarCells[cellIndex];
                  const isWeddingDay = day === weddingDay;
                  const isSunday = dayIndex === 0;
                  
                  return (
                    <td key={dayIndex} className="calendar-cell">
                      <div className="calendar-day">
                        <div className={`day-number ${isWeddingDay ? 'wedding-day' : ''} ${isSunday && day ? 'sunday' : ''}`}>
                          {day || ''}
                        </div>
                        {isWeddingDay && (
                          <div className="wedding-time">오전 11시</div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Calendar;