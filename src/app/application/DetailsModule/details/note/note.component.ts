import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CRUDService } from './../../../../shared/crud.service';
import { Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { icon } from 'src/app/shared/lexique';
import { Job } from 'src/app/shared/job';
import { map } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html'
})
export class NoteComponent implements OnInit {

  // ENUM ICON
  icon = icon;

  // CURRENT JOB
id !: string | null;

job !: Job;

constructor(public dialog: MatDialog, private crud: CRUDService, private route: ActivatedRoute) { }

ngOnInit(): void {
  this.route.paramMap.subscribe((param: ParamMap) => this.id = param.get('id'));

  this.crud.readAllJobs$().pipe(
    map(jobs => jobs.filter(job => job.id === this.id))
  ).subscribe(jobs => this.job = jobs[0]);
}

  // OPEN NOTE DIALOG
openNoteDialog(): void {
  this.dialog.open(DetailsNoteDialog, {
    height: '65vh',
    width: '50%',
    data : {job : this.job}});
}
}

/* DetailsNoteDialog COMPONENT */

@Component({
  selector: 'details-note-dialog',
  templateUrl: './NoteDialog/details-note-dialog.html',
  styleUrls: ['./NoteDialog/details-note-dialog.scss']

})
export class DetailsNoteDialog implements OnInit {

    constructor(
      private dialogRef: MatDialogRef<DetailsNoteDialog>,
      @Inject(MAT_DIALOG_DATA) private data: any,
      private crud: CRUDService, private translate: TranslateService, private snackBar: MatSnackBar) {}

    // ENUM ICON
    icon = icon;

    noteForm !: FormGroup;

  ngOnInit(): void {

    // NOTEFORM
    this.noteForm = new FormGroup({
    note: new FormControl(this.data.job.note)
  });
}

// NOTE SUBMIT
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
      applicationMessage : this.data.job.applicationMessage ? this.data.job.applicationMessage : null,
      note : this.noteForm.value.note,
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
          ` ${this.translate.instant('JOB.note')} ${this.translate.instant('BUTTON.edited')}`,
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
