import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors} from '@angular/forms';
import { UserService } from '../core/user.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor(private user: UserService) { }

  majRequired(control: AbstractControl): ValidationErrors | null {
      const value = control.value;
      const hasUpperCase = /[A-Z]+/.test(value);
      return !hasUpperCase ? {passwordMaj: true} : null;
  }

  minRequired(control: AbstractControl): ValidationErrors | null {
      const value = control.value;
      const hasLowerCase = /[a-z]+/.test(value);
      return !hasLowerCase ? {passwordMin: true} : null;
  }

  numRequired(control: AbstractControl): ValidationErrors | null {
      const value = control.value;
      const hasNumeral = /[0-9]+/.test(value);
      return !hasNumeral ? {passwordNum: true} : null;
  }
}
