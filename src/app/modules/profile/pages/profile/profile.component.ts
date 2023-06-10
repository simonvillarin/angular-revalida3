import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserService } from '../../user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  loggedInUser: User[] = [];
  resetloggedInUserData: User[] = [];
  userId: number = 0;
  sub: Subscription | undefined

  constructor(private router: Router, private userService: UserService) {}

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

  refreshUserProfile() {
    this.sub?.unsubscribe;
  }

  // Edit div
  showProfileCont: boolean = true;
  showEditForm: boolean = false;

  toggleEditMode() {
    this.showProfileCont = !this.showProfileCont;
    this.showEditForm = !this.showEditForm;
  } 

  cancel() {
    this.showEditForm = false;
    this.showProfileCont = true;
  }

  navigateChangePassword() {
    this.router.navigate(['change/password']);
  }
}
