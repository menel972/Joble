import { icon } from 'src/app/shared/lexique';
import { AuthService } from './../../../../core/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  // ENUM ICON
  icon = icon;

  // BREAKPOINT
 Medium$ = this.breakpoint.observe(Breakpoints.TabletLandscape);
 Large$ = this.breakpoint.observe(Breakpoints.Large);
 XtraLarge$ = this.breakpoint.observe(Breakpoints.XLarge);

  accountForm !: FormGroup;

  constructor(
    private user: UserService,
    private auth: AuthService,
    private breakpoint: BreakpointObserver
    ) { }

  user$ = this.user.currentUser$;

  ngOnInit(): void {
    this.user.getCurrentUser$();

    this.accountForm = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      mail: new FormControl('', [Validators.required, Validators.email])
    });
  }

  resetPassword(): void {
    this.auth.resetPasswordLink(this.accountForm.value.mail);
  }

  logout(): void {
    this.auth.signOut();
  }

}
