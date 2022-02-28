import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest, map, Observable, tap, BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // DATA BASE
  userDb = this.afs.collection('users');
  users$ !: Observable<User[]>;
  checkMail$ = new BehaviorSubject<boolean>(false);
  resetUser$ = new BehaviorSubject<User>({
    firstName: '',
    lastName: '',
    mail: ''
  });
  currentUser$ = new BehaviorSubject<User>({
    firstName: '',
    lastName: '',
    mail: ''
  });
  currentId$ = new BehaviorSubject<string>('');

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private translate: TranslateService
    ) {
    this.users$ = this.userDb.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
      );
   }

  // GET CURRENT USER
  getCurrentUser$(): Observable<User> {

    return combineLatest( this.users$, this.afAuth.authState).pipe(
      map(([users, fireUser]) => users.filter(user => user.mail === fireUser?.email)),
      map(users => users[0]),
      tap(user => this.currentUser$.next(user)),
      // tslint:disable-next-line:no-non-null-assertion
      tap(user => this.currentId$.next(user.id!))
    );
  }

       // CREATE USERS INTO THE DATABASE
       createUser(formValue: User): void {
        this.userDb.add({ ...formValue });
      }

 // UPDATE - EDIT USERS INTO THE DATABASE

  updateUser(user: User): void {
    this.userDb.doc(user.id).set(user);
    this.userUpdateSnackBar();
  }

  // SNACK-BAR
  userUpdateSnackBar(): void {
    this.snackBar.open(
      this.translate.instant('userUpdateMessage'),
      '', {
        horizontalPosition: 'end',
        duration: 3000
      });
  }

}
