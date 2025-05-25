export const APP_NAME = '스마트 학습 도우미';
export const APP_DESCRIPTION = '텍스트를 입력하고 AI가 생성한 질문으로 복습하세요. 로그인 없이 바로 사용 가능합니다.';

export const STORAGE_KEYS = {
  STUDIES: 'smart-study-assistant-studies',
  SETTINGS: 'smart-study-assistant-settings',
  BOOKMARKS: 'smart-study-assistant-bookmarks',
};

export const DEFAULT_QUESTIONS_COUNT = 5;
export const MAX_QUESTIONS_COUNT = 10;
export const MIN_QUESTIONS_COUNT = 3;

export const FILE_TYPES = {
  ACCEPTED: '.txt,.pdf',
  ACCEPT_MIME: 'text/plain,application/pdf',
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ROUTES = {
  HOME: '/',
  STUDY: '/study',
  HISTORY: '/history',
  SETTINGS: '/settings',
  BOOKMARKS: '/bookmarks',
}; 