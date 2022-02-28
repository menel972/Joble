import { Timestamp } from '@firebase/firestore-types';
export interface User {
  id?: string;
  displayName?: string | null;
  firstName: string;
  lastName: string;
  age?: Timestamp | null;
  mail: string;
}
