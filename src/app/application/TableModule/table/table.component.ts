import { FormGroup, FormControl } from '@angular/forms';
import { CRUDService } from 'src/app/shared/crud.service';
import { Component, OnInit } from '@angular/core';

import { icon } from 'src/app/shared/lexique';
import { Job } from 'src/app/shared/job';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor( private crud: CRUDService) { }

  // ENUM ICON
  icon = icon;

  /* TABLE */

  // JOB LIST DATA
  dataBase: Job[] = [{
    userId: ' ',
    favorite: true,
    name: 'JOB.DESCRIPTION.name',
    status: 'JOB.statut',
    work: 'JOB.DESCRIPTION.work',
    type: 'JOB.DESCRIPTION.type',
    city: 'JOB.city',
    createdAt: null
  }];
  dataSource !: Job[];
  jobName !: string;
  jobId !: string;

  // TABLE ORDER
  displayedColumns: string[] = ['index', 'favorite', 'name', 'status', 'work', 'type', 'city', 'date_1', 'date_2' ];

  /*  SEARCH BAR */

  form !: FormGroup;

  ngOnInit(): void {
    this.crud.readAllJobs$().subscribe(data => this.dataSource = data);

    this.form = new FormGroup({
      search : new FormControl('')
    });
  }

  setJob(job: Job): void {

    this.jobName = job.name.toLowerCase().split(' ').join('');
    // tslint:disable-next-line:no-non-null-assertion
    this.jobId = job.id!;
    this.crud.setCurrentJob(job);
  }

  // tslint:disable-next-line:typedef
  submit() {}

  // REMOVE THE FILTER
  // tslint:disable-next-line:typedef
  erased() {
    this.form.setValue({search : ''});
  }

}
