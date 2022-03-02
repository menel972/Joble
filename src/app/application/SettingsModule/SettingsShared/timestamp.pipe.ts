import {formatDate} from '@angular/common';
import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import { Timestamp } from '@firebase/firestore-types';

@Pipe({
  name: 'timeStamp'
})
export class TimestampPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {
    }

    transform(timestamp: Timestamp, format?: string): string {
        if (!timestamp?.toDate) {
            return '';
        }
        return formatDate(timestamp.toDate(), format || 'medium', this.locale);
    }
}
