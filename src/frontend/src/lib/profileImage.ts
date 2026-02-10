import { STORAGE_KEYS } from './localStorageKeys';

const DEFAULT_IMAGE_URL = 'https://i.imgur.com/jP4xM3j.jpeg';

export function loadProfileImage(): string {
  return localStorage.getItem(STORAGE_KEYS.PROFILE_IMAGE) || DEFAULT_IMAGE_URL;
}

export function saveProfileImage(dataUrl: string): void {
  localStorage.setItem(STORAGE_KEYS.PROFILE_IMAGE, dataUrl);
}
