import { Timestamp } from '@firebase/firestore-types';
export interface Job {
  id?: string;
  userId: string;
  favorite ?: boolean;
  name: string;
  status: string;
  type ?: string;
  work ?: string;
  web ?: string |null;
  city ?: string;
  adress ?: string | null;
  contact ?: string | null;
  tel ?: string | null;
  mail ?: string | null;
  applicationMessage ?: string | null;
  note ?: string | null;
  date_1 ?: Timestamp;
  date_2 ?: Timestamp;
}
