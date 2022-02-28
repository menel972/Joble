import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService
    ) { }

    // SIGN UP WITH EMAIL & PASSWORD
  emailSignUp(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
      }).catch((error) => {
        window.alert(error.message);
      });
    }

    // SIGN IN WITH EMAIL & PASSWORD
    signIn(email: string, password: string): Promise<any> {
      return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.loginSnackBar();
        this.router.navigate(['app']);
        }).catch((error) => {
          window.alert(error.message);
        });
    }

    // SIGN OUT & RELOAD
    signOut(): Promise<any> {
      return this.afAuth.signOut()
      .then(() => {
        this.logoutSnackBar();
        this.router.navigate(['connexion']);

        setTimeout(() => {
          location.reload();
        }, 3000);
      }).catch((error) => {
        window.alert(error.message);
      });
    }

    // SEND RESET PASSWORD LINK
    resetPasswordLink(email: string): Promise<any> {
      return this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        window.alert(this.translate.instant('resetLinkMessage'));
        this.signOut();
      }).catch((error) => {
        window.alert(error.message);
      });
    }

    resetPassword(code: string, mdp: string): Promise<any> {
      return this.afAuth.confirmPasswordReset(code, mdp)
      .then(() => {
        this.resetSnackBar();
      }).catch((error) => {
        window.alert(error.message);
      });
    }

        // SNACK-BAR
        loginSnackBar(): void {
          this.snackBar.open(
           this.translate.instant('welcome'),
            '', {
              horizontalPosition: 'end',
              duration: 3000
            });
        }

        resetSnackBar(): void {
          this.snackBar.open(
            this.translate.instant('resetMessage'),
            '', {
              horizontalPosition: 'end',
              duration: 3000
            });
        }

        logoutSnackBar(): void {
          this.snackBar.open(
            this.translate.instant('signoutMessage'),
            '', {
              horizontalPosition: 'end'
            });
        }

}
