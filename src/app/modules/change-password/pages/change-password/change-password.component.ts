import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { hasLowercaseValidator, hasNumberValidator, hasSymbolValidator, hasUppercaseValidator } from 'src/app/modules/validators/custom.validator';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
  changePassForm: FormGroup;
  loggedInUser: User[] = [];
  userId: number = 0;
  sub: Subscription | undefined;
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.changePassForm = fb.group({
      confirmPass: ['', Validators.required],
      newPass: ['', [
          Validators.required,
          Validators.minLength(8),
          hasNumberValidator(),
          hasLowercaseValidator(),
          hasUppercaseValidator(),
          hasSymbolValidator(),
        ],
      ],
    });
  }

  get newPass() {
    return this.changePassForm.get('newPass') as FormControl;
  }
  get confirmPass() {
    return this.changePassForm.get('confirmPass') as FormControl;
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) {
      const user = JSON.parse(userLocalStorage);
      this.userId = user.userId;
    }

    this.sub = this.userService.getUserById(this.userId).subscribe((user) => {

      this.loggedInUser.push(user);
      console.log(this.loggedInUser);
    })
  }

  getUserData() {
    this.userService.getUserById(this.userId).subscribe((user: User) => {
      this.changePassForm.patchValue(
        {
          confirmPass: user.password
        }
      );
    })
  }

  successMessage: string = '';
  errorMessage: string = '';
  
  onSubmit() {
    if(this.changePassForm.valid) {
      console.log(this.changePassForm.value.newPass);
      console.log(this.changePassForm.value.confirmPass);
      const user = this.changePassForm.getRawValue();
      if(this.changePassForm.value.newPass === this.changePassForm.value.confirmPass) {
        this.userService.updateUser(this.userId, user).subscribe((res) => {
          console.log(res);
          
        });
        alert(this.successMessage = 'Password successfuly changed');
        this.router.navigate(['profile'])
      } else {
        this.errorMessage = 'New password entered does not match.';
      }
    }
  }
}
