// Kakao SDK 타입 정의
declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: KakaoShareOptions) => void;
      };
    };
  }
}

interface KakaoShareOptions {
  objectType: 'feed';
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
  buttons?: Array<{
    title: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  }>;
}

const KAKAO_JS_KEY = '439c8fb6037735b1a6e4856e2772f492';

export const initKakao = (): boolean => {
  try {
    if (typeof window !== 'undefined' && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
        console.log('Kakao SDK initialized successfully');
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to initialize Kakao SDK:', error);
    return false;
  }
};

export const shareToKakao = (): void => {
  if (!initKakao()) {
    alert('카카오톡 공유 기능을 사용할 수 없습니다.');
    return;
  }

  try {
    const shareOptions: KakaoShareOptions = {
      objectType: 'feed',
      content: {
        title: '순원 ♥ 순투 결혼식에 초대합니다',
        description: '2026년 1월 10일 오전 11시\n영등포 더컨벤션 2층\n\n저희의 새로운 시작을 함께해주세요 💕',
        imageUrl: 'https://kngsnwn.github.io/wedding/images/cover.jpg',
        link: {
          mobileWebUrl: 'https://kngsnwn.github.io/wedding',
          webUrl: 'https://kngsnwn.github.io/wedding'
        }
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: 'https://kngsnwn.github.io/wedding',
            webUrl: 'https://kngsnwn.github.io/wedding'
          }
        }
      ]
    };

    window.Kakao.Share.sendDefault(shareOptions);
  } catch (error) {
    console.error('Failed to share via Kakao:', error);
    alert('카카오톡 공유 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
};

export const shareToWeb = (): void => {
  if (navigator.share) {
    navigator.share({
      title: '순원 ♥ 순투 결혼식에 초대합니다',
      text: '2026년 1월 10일 오전 11시, 영등포 더컨벤션에서 새로운 시작을 함께해주세요',
      url: 'https://kngsnwn.github.io/wedding'
    }).catch((error) => {
      console.error('Web Share failed:', error);
      copyToClipboard();
    });
  } else {
    copyToClipboard();
  }
};

export const copyToClipboard = (): void => {
  const url = 'https://kngsnwn.github.io/wedding';
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      alert('청첩장 링크가 복사되었습니다!\n' + url);
    }).catch(() => {
      fallbackCopyToClipboard(url);
    });
  } else {
    fallbackCopyToClipboard(url);
  }
};

const fallbackCopyToClipboard = (text: string): void => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    alert('청첩장 링크가 복사되었습니다!\n' + text);
  } catch (err) {
    console.error('Fallback copy failed:', err);
    alert('링크 복사에 실패했습니다. 수동으로 복사해주세요:\n' + text);
  }
  
  document.body.removeChild(textArea);
};