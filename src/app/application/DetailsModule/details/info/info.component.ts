import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CRUDService } from './../../../../shared/crud.service';
import { Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { icon } from 'src/app/shared/lexique';
import { Job } from 'src/app/shared/job';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

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

  // OPEN INFO DIALOG
  openInfoDialog(): void {
    if (this.breakpoint.isMatched(Breakpoints.TabletLandscape)) {
      this.dialog.open(DetailsInfoDialog, { height: '70vh', width: '65%', data : {job : this.job}});
    }

    if (this.breakpoint.isMatched(Breakpoints.Large)) {
      this.dialog.open(DetailsInfoDialog, { height: '70vh', width: '60%', data : {job : this.job}});
    }

    if (this.breakpoint.isMatched(Breakpoints.XLarge)) {
      this.dialog.open(DetailsInfoDialog, { height: '70vh', width: '50%', data : {job : this.job}});
    }

}

}

/* DetailsInfoDialog COMPONENT */

@Component({
  selector: 'dashboard-edit-dialog',
  templateUrl: './InfoDialog/details-info-dialog.html',
  styleUrls: ['./InfoDialog/details-info-dialog.scss']

})
export class DetailsInfoDialog {

  constructor(
    public dialogRef: MatDialogRef<DetailsInfoDialog>,
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

  infoForm !: FormGroup;

// STATUS SELECT
status = [
  {value : 'history', viewValue: this.translate.instant('JOB.DESCRIPTION.statusWait') },
{value : 'send', viewValue: this.translate.instant('JOB.DESCRIPTION.statusSend') },
{value : 'done', viewValue: this.translate.instant('JOB.DESCRIPTION.statusYes') },
{value : 'clear', viewValue: this.translate.instant('JOB.DESCRIPTION.statusNo') }];

selectedStatus = this.status[0].value;

// FAVORITE SELECT
favs = [
  {value : true, viewValue: this.translate.instant('BUTTON.add') },
{value : false, viewValue: this.translate.instant('JOB.DESCRIPTION.favoriteNo') }];

ngOnInit(): void {

  // INFOFORM

  this.infoForm = new FormGroup({
      favorite : new FormControl(this.data.job.favorite),
      name : new FormControl(this.data.job.name, Validators.required),
      status : new FormControl(this.data.job.status, Validators.required),
      type : new FormControl(this.data.job.type, Validators.maxLength(15)),
      work : new FormControl(this.data.job.work, Validators.maxLength(15)),
      web : new FormControl(this.data.job.web),
      city : new FormControl(this.data.job.city, Validators.maxLength(15)),
      adress : new FormControl(this.data.job.adress),
      contact : new FormControl(this.data.job.contact, Validators.maxLength(15)),
      tel : new FormControl(this.data.job.tel, Validators.maxLength(14)),
      mail : new FormControl(this.data.job.mail),
      date_1: new FormControl(this.data.job.date_1?.toDate()),
      date_2 : new FormControl(this.data.job.date_2?.toDate())
    });
}

// INFO SUBMIT
  editInfo(): void {
    const formValue: Job = {
      id: this.data.job.id,
      userId: this.data.job.userId,
      favorite : this.infoForm.value.favorite ? this.infoForm.value.favorite : null,
      name : this.infoForm.value.name,
      status : this.infoForm.value.status,
      type : this.infoForm.value.type ? this.infoForm.value.type : null,
      work : this.infoForm.value.work ? this.infoForm.value.work : null,
      web : this.infoForm.value.web ? this.infoForm.value.web : null,
      city : this.infoForm.value.city ? this.infoForm.value.city : null,
      adress : this.infoForm.value.adress ? this.infoForm.value.adress : null,
      contact : this.infoForm.value.contact ? this.infoForm.value.contact : null,
      tel : this.infoForm.value.tel ? this.infoForm.value.tel : null,
      mail : this.infoForm.value.mail ? this.infoForm.value.mail : null,
      applicationMessage : this.data.job.applicationMessage ? this.data.job.applicationMessage : null,
      note : this.data.job.note ? this.data.job.note : null,
      date_1 : this.infoForm.value.date_1 ? this.infoForm.value.date_1 : null,
      date_2 : this.infoForm.value.date_2 ? this.infoForm.value.date_2 : null,
      createdAt: this.data.job.createdAt
    };

    this.crud.updateJob(formValue);
    this.openSnackBar();
    this.Close();
  }

        // SNACK-BAR
        openSnackBar(): void {
          this.snackBar.open(
            ` ${this.translate.instant('JOB.infos')} ${this.translate.instant('BUTTON.edited')}`,
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
