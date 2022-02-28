import { icon } from 'src/app/shared/lexique';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../core/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { ValidatorsService } from 'src/app/shared/validators.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  constructor(private auth: AuthService, private validator: ValidatorsService) { }

  icon = icon;

  @Input() mode!: string;
  @Input() code!: string;

  resetForm!: FormGroup;

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8), this.validator.majRequired, this.validator.minRequired, this.validator.numRequired]),

      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), this.validator.majRequired, this.validator.minRequired, this.validator.numRequired])
    });
  }
  reset(): void {

    if (this.resetForm.value.password === this.resetForm.value.confirmPassword) {

      this.auth.resetPassword(this.code, this.resetForm.value.password);
    }
  }

}
