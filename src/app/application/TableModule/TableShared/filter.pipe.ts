import { Pipe, PipeTransform } from '@angular/core';
import { Job } from 'src/app/shared/job';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(jobList: Job[], filtre: string): Job[] {
    if ( filtre === '' || null) {
      return jobList;
    }

    return jobList.filter(job => job.name
      .toLowerCase()
      .includes(filtre
        .trim()
        .toLowerCase()
      )
  );

  }

}
