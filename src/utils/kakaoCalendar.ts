// 카카오 캘린더 일정 등록 유틸리티

interface KakaoCalendarEvent {
  title: string;
  time: {
    start_at: string;
    end_at: string;
    time_zone?: string;
    all_day?: boolean;
  };
  description?: string;
  location?: string;
}

// 글로벌 타입 확장
declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        login: (options: {
          success: (authObj: any) => void;
          fail: (err: any) => void;
        }) => void;
      };
      Share: {
        sendDefault: (options: any) => void;
      };
    };
  }
}

export const addToKakaoCalendar = async (): Promise<void> => {
  try {
    // 결혼식 일정 정보
    const weddingEvent: KakaoCalendarEvent = {
      title: '순원 ❤️ 순투 결혼식',
      time: {
        start_at: '2026-01-10T02:00:00Z', // 한국시간 11:00 AM -> UTC
        end_at: '2026-01-10T05:00:00Z',   // 한국시간 2:00 PM -> UTC
        time_zone: 'Asia/Seoul'
      },
      description: '순원과 순투의 결혼식에 초대합니다.\n\n새로운 시작을 함께 축하해주세요! 💕',
      location: '영등포 더컨벤션 2층'
    };

    // 카카오 로그인을 통한 액세스 토큰 필요
    const accessToken = await getKakaoAccessToken();
    
    if (!accessToken) {
      // 액세스 토큰이 없으면 대체 방법 사용
      openKakaoCalendarWeb();
      return;
    }

    const response = await fetch('https://kapi.kakao.com/v2/api/calendar/create/event', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `event=${encodeURIComponent(JSON.stringify(weddingEvent))}`
    });

    if (response.ok) {
      alert('카카오 캘린더에 일정이 등록되었습니다! 📅');
    } else {
      throw new Error('캘린더 일정 등록에 실패했습니다.');
    }
  } catch (error) {
    console.error('Kakao Calendar API Error:', error);
    // API 호출 실패 시 대체 방법 사용
    openKakaoCalendarWeb();
  }
};

// 카카오 로그인을 통한 액세스 토큰 획득
const getKakaoAccessToken = async (): Promise<string | null> => {
  // 현재 환경에서는 Auth 모듈이 로드되지 않았으므로 바로 null 반환
  // 실제 운영 환경에서는 카카오 Auth SDK를 별도로 로드해야 함
  console.log('카카오 Auth 모듈이 로드되지 않아 웹 캘린더로 대체합니다.');
  return null;
};

// 웹 브라우저에서 카카오 캘린더 열기 (대체 방법)
const openKakaoCalendarWeb = (): void => {
  const calendarUrl = createCalendarUrl();
  
  // 모바일 환경에서는 카카오톡 딥링크 시도
  if (isMobile()) {
    const deepLink = `kakaotalk://calendar/add?${calendarUrl}`;
    window.location.href = deepLink;
    
    // 딥링크 실패 시 웹 캘린더로 이동
    setTimeout(() => {
      window.open(`https://calendar.kakao.com/add?${calendarUrl}`, '_blank');
    }, 1500);
  } else {
    // 데스크톱에서는 바로 웹 캘린더 열기
    window.open(`https://calendar.kakao.com/add?${calendarUrl}`, '_blank');
  }
  
  alert('카카오 캘린더가 열립니다. 일정을 확인하고 저장해주세요! 📅');
};

// 캘린더 URL 파라미터 생성
const createCalendarUrl = (): string => {
  const params = new URLSearchParams({
    title: '순원 ❤️ 순투 결혼식',
    start: '2026-01-10T11:00:00+09:00',
    end: '2026-01-10T14:00:00+09:00',
    description: '순원과 순투의 결혼식에 초대합니다.\n\n새로운 시작을 함께 축하해주세요! 💕',
    location: '영등포 더컨벤션 2층'
  });
  
  return params.toString();
};

// 모바일 환경 체크
const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};