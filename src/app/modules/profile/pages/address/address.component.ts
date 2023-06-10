import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit{
  loggedInUser: User[] = [];
  userId: number = 0;

  constructor(private userService: UserService){}

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

  // Edit div
  showAddressCont:boolean = true;
  showEditForm:boolean = false;

  toggleEditMode() {
    this.showAddressCont = !this.showAddressCont;
    this.showEditForm = !this.showEditForm;
  }

  cancel() {
    this.showAddressCont = true;
    this.showEditForm = false;
  }
}
