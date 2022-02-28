import { icon } from 'src/app/shared/lexique';
import { AuthService } from './../../../../core/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  // ENUM ICON
  icon = icon;

  accountForm !: FormGroup;

  constructor(private user: UserService, private auth: AuthService) { }

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
