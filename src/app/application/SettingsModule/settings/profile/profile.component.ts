import { FormGroup, FormControl, Validators } from '@angular/forms';
import { icon } from 'src/app/shared/lexique';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import { User } from 'src/app/core/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // ENUM ICON
  icon = icon;

  profileForm !: FormGroup;

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.user.getCurrentUser$();

    this.profileForm = new FormGroup({
      displayName: new FormControl(),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required)
    });

    this.profileForm.patchValue({
      displayName: this.user.currentUser$.getValue().displayName,
      firstName : this.user.currentUser$.getValue().firstName,
      lastName : this.user.currentUser$.getValue().lastName,
      age : this.user.currentUser$.getValue().age?.toDate()
    });
  }

  editProfile(): void {
    const user: User = {
      id: this.user.currentUser$.getValue().id,
      displayName: this.profileForm.value.displayName ? this.profileForm.value.displayName : this.user.currentUser$.getValue().displayName,
      firstName: this.profileForm.value.firstName ? this.profileForm.value.firstName : this.user.currentUser$.getValue().firstName,
      lastName: this.profileForm.value.lastName ? this.profileForm.value.lastName : this.user.currentUser$.getValue().lastName,
      age: this.profileForm.value.age ? this.profileForm.value.age : this.user.currentUser$.getValue().age,
      mail: this.user.currentUser$.getValue().mail
    };

    this.user.updateUser(user);
  }

}
