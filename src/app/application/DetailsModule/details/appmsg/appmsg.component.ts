import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl} from '@angular/forms';
import { CRUDService } from './../../../../shared/crud.service';
import { Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { icon } from 'src/app/shared/lexique';
import { Job } from 'src/app/shared/job';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-appmsg',
  templateUrl: './appmsg.component.html',
  styleUrls: ['./appmsg.component.scss']
})
export class AppmsgComponent implements OnInit {

    // ENUM ICON
    icon = icon;

      // CURRENT JOB
id !: string | null;

job !: Job;

    constructor(
      public dialog: MatDialog,
      private crud: CRUDService,
      private route: ActivatedRoute,
      private breakpoint: BreakpointObserver
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => this.id = param.get('id'));

    this.crud.readAllJobs$().pipe(
      map(jobs => jobs.filter(job => job.id === this.id))
    ).subscribe(jobs => this.job = jobs[0]);
  }

  // OPEN APP MSG DIALOG
openAppMsgDialog(): void {
  if (this.breakpoint.isMatched(Breakpoints.TabletLandscape)) {
    this.dialog.open(DetailsAppMsgDialog, { height: '70vh', width: '65%', data : {job : this.job}});
  }

  if (this.breakpoint.isMatched(Breakpoints.Large)) {
    this.dialog.open(DetailsAppMsgDialog, { height: '70vh', width: '60%', data : {job : this.job}});
  }

  if (this.breakpoint.isMatched(Breakpoints.XLarge)) {
    this.dialog.open(DetailsAppMsgDialog, { height: '70vh', width: '50%', data : {job : this.job}});
  }
}
}

/* DetailsAppMsgDialog COMPONENT */

@Component({
  selector: 'dashboard-add-dialog',
  templateUrl: './AppmsgDialog/details-appmsg-dialog.html',
  styleUrls: ['./AppmsgDialog/details-appmsg-dialog.scss']
})
export class DetailsAppMsgDialog implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DetailsAppMsgDialog>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private crud: CRUDService,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private breakpoint: BreakpointObserver
  ) {}

  // ENUM ICON
  icon = icon;

  // BREAKPOINT
  Medium$ = this.breakpoint.observe(Breakpoints.TabletLandscape);
  Large$ = this.breakpoint.observe(Breakpoints.Large);
  XtraLarge$ = this.breakpoint.observe(Breakpoints.XLarge);

  appMsgForm !: FormGroup;

ngOnInit(): void {

  this.appMsgForm = new FormGroup({
      appMsg : new FormControl(this.data.job.applicationMessage)
    });
}

// APPMSG SUBMIT
  editNote(): void {
    const formValue: Job = {
      id: this.data.job.id,
      userId: this.data.job.userId,
      favorite : this.data.job.favorite ? this.data.job.favorite : null,
      name : this.data.job.name,
      status : this.data.job.status,
      type : this.data.job.type ? this.data.job.type : null,
      work : this.data.job.work ? this.data.job.work : null,
      web : this.data.job.web ? this.data.job.web : null,
      city : this.data.job.city ? this.data.job.city : null,
      adress : this.data.job.adress ? this.data.job.adress : null,
      contact : this.data.job.contact ? this.data.job.contact : null,
      tel : this.data.job.tel ? this.data.job.tel : null,
      mail : this.data.job.mail ? this.data.job.mail : null,
      applicationMessage : this.appMsgForm.value.appMsg,
      note : this.data.job.note ? this.data.job.note : null,
      date_1 : this.data.job.date_1 ? this.data.job.date_1 : null,
      date_2 : this.data.job.date_2 ? this.data.job.date_2 : null
    };

    this.crud.updateJob(formValue);
    this.openSnackBar();
    this.Close();
  }

        // SNACK-BAR
        openSnackBar(): void {
          this.snackBar.open(
            ` ${this.translate.instant('JOB.applicationMessage')} ${this.translate.instant('BUTTON.edited')}`,
            '', {
              duration: 3000,
              horizontalPosition: 'end'
            });
        }

    // CLOSE THE WINDOW
  Close(): void {
    this.dialogRef.close();
  }
}
