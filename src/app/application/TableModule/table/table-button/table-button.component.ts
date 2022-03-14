import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CRUDService } from './../../../../shared/crud.service';
import { Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { icon } from 'src/app/shared/lexique';
import { Job } from 'src/app/shared/job';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-table-button',
  templateUrl: './table-button.component.html',
  styleUrls: ['./table-button.component.scss']
})
export class TableButtonComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private crud: CRUDService,
    private breakpoint: BreakpointObserver
  ) { }

  // ENUM ICON
  icon = icon;

      // BREAKPOINT
      Medium$ = this.breakpoint.observe(Breakpoints.TabletLandscape);
      Large$ = this.breakpoint.observe(Breakpoints.Large);
      XtraLarge$ = this.breakpoint.observe(Breakpoints.XLarge);

  Jobs$ = this.crud.readAllJobs$();

  ngOnInit(): void {
  }

/* DIALOG */

// OPEN ADD DIALOG
  openAddDialog(): void {
    if (this.breakpoint.isMatched(Breakpoints.TabletLandscape)) {
      this.dialog.open(DashboardAddDialog, { height: '70vh', width: '65%' });
    }

    if (this.breakpoint.isMatched(Breakpoints.Large)) {
      this.dialog.open(DashboardAddDialog, { height: '70vh', width: '60%' });
    }

    if (this.breakpoint.isMatched(Breakpoints.XLarge)) {
      this.dialog.open(DashboardAddDialog, { height: '70vh', width: '50%' });
    }
  }

// OPEN EDIT DIALOG
  openEditDialog(): void {
    if (this.breakpoint.isMatched(Breakpoints.TabletLandscape)) {
    this.dialog.open(DashboardEditDialog, { height: '70vh', width: '65%' });
    }

    if (this.breakpoint.isMatched(Breakpoints.Large)) {
    this.dialog.open(DashboardEditDialog, { height: '70vh', width: '60%' });
    }

    if (this.breakpoint.isMatched(Breakpoints.XLarge)) {
    this.dialog.open(DashboardEditDialog, { height: '70vh', width: '50%' });
    }
  }

// OPEN DELETE DIALOG
  openDeleteDialog(): void {
    if (this.breakpoint.isMatched(Breakpoints.TabletLandscape)) {
    this.dialog.open(DashboardDeleteDialog, { height: '70vh', width: '65%' });
    }

    if (this.breakpoint.isMatched(Breakpoints.Large)) {
    this.dialog.open(DashboardDeleteDialog, { height: '70vh', width: '60%' });
    }

    if (this.breakpoint.isMatched(Breakpoints.XLarge)) {
    this.dialog.open(DashboardDeleteDialog, { height: '70vh', width: '50%' });
    }
  }
}

/* DashboardAddDialog COMPONENT */

@Component({
  selector: 'dashboard-add-dialog',
  templateUrl: './AddDialog/dashboard-add-dialog.html',
  styleUrls: ['./AddDialog/dashboard-add-dialog.scss']

})
export class DashboardAddDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DashboardAddDialog>,
    private crud: CRUDService,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private breakpoint: BreakpointObserver
    ) {}

  // ENUM ICON
  icon = icon;

  addForm !: FormGroup;

    // BREAKPOINT
    Medium$ = this.breakpoint.observe(Breakpoints.TabletLandscape);
    Large$ = this.breakpoint.observe(Breakpoints.Large);
    XtraLarge$ = this.breakpoint.observe(Breakpoints.XLarge);

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
    this.addForm = new FormGroup({
      name : new FormControl('', Validators.required),
      type : new FormControl(),
      work : new FormControl(),
      city : new FormControl(),
      favorite : new FormControl(),
      status : new FormControl('', Validators.required),
      date_1: new FormControl(),
      date_2 : new FormControl()
    });
  }

  // JOB SUBMIT
  submit(): void {
    const formValue: Job = {
      userId: ' ',
      favorite : this.addForm.value.favorite ? this.addForm.value.favorite : null,
      name : this.addForm.value.name,
      status : this.addForm.value.status,
      type : this.addForm.value.type ? this.addForm.value.type : null,
      work : this.addForm.value.work ? this.addForm.value.work : null,
      web : null,
      city : this.addForm.value.city ? this.addForm.value.city : null,
      adress : null,
      contact : null,
      tel : null,
      mail : null,
      applicationMessage : null,
      note : null,
      date_1 : this.addForm.value.date_1 ? this.addForm.value.date_1 : null,
      date_2 : this.addForm.value.date_2 ? this.addForm.value.date_2 : null
    };

    this.crud.createJob(formValue);
    this.openSnackBar();
    this.addForm.reset();
    this.dialogRef.close();
    }

  // SNACK-BAR
  openSnackBar(): void {
    this.snackBar.open(
      ` ${this.addForm.value.name.toUpperCase()} ${this.translate.instant('BUTTON.added')}`,
      '', {
        duration: 3000,
        horizontalPosition: 'end'
      });
  }

  // CLOSE THE WINDOW
  Close(): void {
    this.addForm.reset();
    this.dialogRef.close();
  }
}

/* DashboardEditDialog COMPONENT */

@Component({
  selector: 'dashboard-edit-dialog',
  templateUrl: './EditDialog/dashboard-edit-dialog.html',
  styleUrls: ['./EditDialog/dashboard-edit-dialog.scss']

})
export class DashboardEditDialog {

  constructor(
    public dialogRef: MatDialogRef<DashboardEditDialog>,
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

  editForm !: FormGroup;

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

  // JOB LIST
  dataSource$ = this.crud.readAllJobs$();
  selectedJob$ = this.crud.readCurrentJob$();
  currentJob !: Job;

  // SELECTED JOB
  Window = false;

ngOnInit(): void {
  this.editForm = new FormGroup({
      name : new FormControl('', Validators.required),
      type : new FormControl(),
      work : new FormControl(),
      city : new FormControl(),
      favorite : new FormControl(),
      status : new FormControl('', Validators.required),
      date_1: new FormControl(),
      date_2 : new FormControl()
    });
}

  changeWindow (job: Job): void {
    this.crud.setCurrentJob(job);

    this.editForm.patchValue({
      id: job.id,
      name : job.name,
      type : job.type,
      work : job.work,
      city : job.city,
      favorite : job.favorite,
      status : job.status,
      date_1: job.date_1?.toDate(),
      date_2 : job.date_2?.toDate()
    });

    this.currentJob = job;
    this.Window = true;
  }

  editJob(id: string): void {
    const formValue: Job = {
      id: id,
      userId: this.currentJob.userId,
      favorite : this.editForm.value.favorite ? this.editForm.value.favorite : null,
      name : this.editForm.value.name,
      status : this.editForm.value.status,
      type : this.editForm.value.type ? this.editForm.value.type : null,
      work : this.editForm.value.work ? this.editForm.value.work : null,
      web : this.currentJob.web ? this.currentJob.web : null,
      city : this.editForm.value.city ? this.editForm.value.city : null ,
      adress : this.currentJob.adress ? this.currentJob.adress : null,
      contact : this.currentJob.contact ? this.currentJob.contact : null,
      tel : this.currentJob.tel ? this.currentJob.tel : null,
      mail : this.currentJob.mail ? this.currentJob.mail : null,
      applicationMessage : this.currentJob.applicationMessage ? this.currentJob.applicationMessage : null,
      note : this.currentJob.note ? this.currentJob.note : null,
      date_1 : this.editForm.value.date_1 ? this.editForm.value.date_1 : null,
      date_2 : this.editForm.value.date_2 ? this.editForm.value.date_2 : null,
      createdAt: this.currentJob.createdAt
    };

    this.crud.updateJob(formValue);
    this.openSnackBar();
    this.Window = false;
  }

    // SNACK-BAR
    openSnackBar(): void {
      this.snackBar.open(
        ` ${this.editForm.value.name.toUpperCase()} ${this.translate.instant('BUTTON.edited')}`,
        '', {
          duration: 3000,
          horizontalPosition: 'end'
        });
    }

    // CLOSE THE WINDOW
    Close(): void {
      this.dialogRef.close();
    }

    Back(): void {
      this.Window = false;
    }
}

/* DashboardDeleteDialog COMPONENT */

@Component({
  selector: 'dashboard-delete-dialog',
  templateUrl: './DeleteDialog/dashboard-delete-dialog.html',
  styleUrls: ['./DeleteDialog/dashboard-delete-dialog.scss']

})
export class DashboardDeleteDialog implements OnInit {

    constructor(
      public dialogRef: MatDialogRef<DashboardDeleteDialog>,
      private crud: CRUDService,
      private translate: TranslateService,
      private snackBar: MatSnackBar,
      private breakpoint: BreakpointObserver
    ) {}

    // ENUM ICON
    icon = icon;

    name !: string;

   // BREAKPOINT
   Medium$ = this.breakpoint.observe(Breakpoints.TabletLandscape);
   Large$ = this.breakpoint.observe(Breakpoints.Large);
   XtraLarge$ = this.breakpoint.observe(Breakpoints.XLarge);

    // JOB LIST
    dataSource$ = this.crud.readAllJobs$();
    selectedJob$ = this.crud.readCurrentJob$();

   // SELECTED JOB
   Window = false;

    ngOnInit(): void {
    }

  changeWindow (job: Job): void {
    this.crud.setCurrentJob(job);
    this.name = job.name;
    this.Window = true;
  }

  deleteJob(id: string): void {
    this.crud.deleteJob(id);
    this.openSnackBar();
    this.Window = false;
  }

      // SNACK-BAR
      openSnackBar(): void {
        this.snackBar.open(
          ` ${this.name.toUpperCase()} ${this.translate.instant('BUTTON.deleted')}`,
          '', {
            duration: 3000,
            horizontalPosition: 'end'
          });
      }

    // CLOSE THE WINDOW
    Close(): void {
      this.dialogRef.close();
    }

    Back(): void {
      this.Window = false;
    }
}
