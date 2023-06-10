import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-cp-confirm-email',
  templateUrl: './cp-confirm-email.component.html',
  styleUrls: ['./cp-confirm-email.component.scss']
})
export class CpConfirmEmailComponent implements OnInit{
  changePassForm: FormGroup;
  loggedInUser: User[] = [];
  userId: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
  ) {
    this.changePassForm = fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.changePassForm.get('email') as FormControl;
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

    this.userService.getUserById(this.userId).subscribe((user) => {
      this.loggedInUser.push(user);
      console.log(this.loggedInUser);
    })
  }

  getUserData() {
    this.userService.getUserById(this.userId).subscribe((user: User) => {
      this.changePassForm.patchValue(
        {
          email: user.email
        }
      );
    })
  }
  
  onSubmit() {
    this.router.navigate(['confirm/change/password'])
  }
}
