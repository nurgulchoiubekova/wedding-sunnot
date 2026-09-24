export interface RsvpResponse {
  id: string;
  name: string;
  attending: 'yes' | 'no';
  guestsCount: string;
  wish?: string;
  timestamp: number;
}

export interface GuestWish {
  id: string;
  name: string;
  wish: string;
  date: string;
  likes: number;
}

declare global {
  interface Window {
    GOOGLE_SHEETS_URL?: string;
  }
}
