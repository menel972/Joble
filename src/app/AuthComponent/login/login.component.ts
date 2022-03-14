import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { icon } from 'src/app/shared/lexique';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { ValidatorsService } from 'src/app/shared/validators.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private validator: ValidatorsService,
    private breakpoint: BreakpointObserver
  ) { }

// ENUM ICON
  icon = icon;

  // BREAKPOINTS
  Medium$ = this.breakpoint.observe(Breakpoints.TabletLandscape);
  Large$ = this.breakpoint.observe(Breakpoints.Large);
  XtraLarge$ = this.breakpoint.observe(Breakpoints.XLarge);

  loginForm !: FormGroup;
  mdp = true;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      mail : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, this.validator.majRequired, this.validator.minRequired, this.validator.numRequired])
    });
  }

  login(): void {
    this.auth.signIn(this.loginForm.value.mail, this.loginForm.value.password);
  }
}
