import { TranslateService } from '@ngx-translate/core';
import { icon } from 'src/app/shared/lexique';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/core/user';
import { UserService } from 'src/app/core/user.service';
import { ValidatorsService } from 'src/app/shared/validators.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // ENUM ICON
  icon = icon;

  registerForm !: FormGroup;
  mdp = true;

  constructor(private auth: AuthService, private user: UserService, private validator: ValidatorsService, private snackBar: MatSnackBar, private translate: TranslateService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(''),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      mail : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(8), this.validator.majRequired, this.validator.minRequired, this.validator.numRequired])
    });
  }

  register(): void {
    const user: User = {
      displayName: this.registerForm.value.username ? this.registerForm.value.username : null,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      age: this.registerForm.value.age,
      mail: this.registerForm.value.mail
    };

    this.user.createUser(user);

    this.auth.emailSignUp(this.registerForm.value.mail, this.registerForm.value.password);
    this.openSnackBar();

    setTimeout(() => {
      location.reload();
    }, 3000);
  }

  // SNACK-BAR
  openSnackBar(): void {
    this.snackBar.open(
      ` ${this.translate.instant('welcome')} ${this.registerForm.value.username ? this.registerForm.value.username : this.registerForm.value.firstName} ${this.translate.instant('registerMessage')}`,
      '', {
        horizontalPosition: 'end'
      });
  }
}
