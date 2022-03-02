import { Job } from './job';
import { Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { map} from 'rxjs/operators';
import { UserService } from '../core/user.service';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  // DATA BASE
  jobDb = this.afs.collection('jobList');
  job$ !: Observable<Job[]>;
  selectedJob$ = new Subject <Job>();

  constructor(
    private afs: AngularFirestore,
    private user: UserService
    ) {
    this.job$ = this.jobDb.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Job;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
      );
    }

    /* CRUD */

     // CREATE - ADD OR SET JOBS INTO THE DATABASE

     createJob(formValue: Job): void {
      this.user.getCurrentUser$();
      formValue.userId = this.user.currentId$.getValue();

      this.jobDb.add({ ...formValue });
     }

     setCurrentJob(job: Job): void {
       this.selectedJob$.next(job);
     }

    // READ - GET JOBS FROM THE DATABASE
    // GET ALL JOBS
    readAllJobs$(): Observable<Job[]> {
      this.user.getCurrentUser$();

      return this.job$.pipe(
        map(users => users.filter(user => user.userId === this.user.currentId$.getValue())),
        map(jobs =>
          // tslint:disable-next-line:no-non-null-assertion
          jobs.sort((x, y) => +x.createdAt! - +y.createdAt!)
        )
      );
    }

    // GET ONE JOB
    readCurrentJob$(): Subject <Job> {
      return this.selectedJob$;
    }

  // UPDATE - EDIT JOBS INTO THE DATABASE

  updateJob(job: Job): void {
    this.jobDb.doc(job.id).set(job);
  }
  //  DELETE - ERASED JOBS FROM THE DATABASE

  deleteJob(id: string): void {
    this.jobDb.doc(id).delete();
  }
}
