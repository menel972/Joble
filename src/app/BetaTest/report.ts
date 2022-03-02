import { Timestamp } from '@firebase/firestore-types';
export interface Report {
  userId?: string;
  firstName?: string;
  date: Timestamp;
  title: string;
  explain: string;
  state: boolean;
}
