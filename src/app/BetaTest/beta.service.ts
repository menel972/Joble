import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, Subject } from 'rxjs';
import { UserService } from '../core/user.service';
import { Report } from './report';

@Injectable({
  providedIn: 'root'
})
export class BetaService {

    // DATA BASE
    reportDb = this.afs.collection('report');
    reports$ !: Observable<Report[]>;
    selectedJob$ = new Subject <Report>();

    constructor(
      private afs: AngularFirestore,
      private user: UserService,
      private snackBar: MatSnackBar,
      private translate: TranslateService
    ) {
      this.reports$ = this.reportDb.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Report;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
        );
    }

      /* CRUD */

     // CREATE - ADD REPORTS INTO THE DATABASE
     createReport(formValue: Report): void {
      this.user.getCurrentUser$();
      formValue.userId = this.user.currentId$.getValue();
      formValue.firstName = this.user.currentUser$.getValue().firstName;

      this.reportDb.add({ ...formValue });
      this.openSnackBar(formValue.title);
     }

    // READ - GET REPORTS FROM THE DATABASE
    readAllReports$(): Observable<Report[]> {
      this.user.getCurrentUser$();

      return this.reports$.pipe(
        map(reports => reports.filter(report => report.userId === this.user.currentId$.getValue())),
        map(reports =>
          reports.sort((x, y) => +x.date - +y.date)
          )
      );
    }

      // SNACK-BAR
  openSnackBar(title: string): void {
    this.snackBar.open(
      ` ${title} ${this.translate.instant('BETA.added')}`,
      '', {
        duration: 3000,
        horizontalPosition: 'end'
      });
  }

}
