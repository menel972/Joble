import { Job } from 'src/app/shared/job';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'link'
})
export class LinkPipe implements PipeTransform {

  // tslint:disable-next-line:no-multi-spaces
  transform(job: Job): string  {

    let link = '';
    if ( job.web == null) {
      return link;
    }

    link = job.name.split(' ').join('');
    return link;
  }
}
