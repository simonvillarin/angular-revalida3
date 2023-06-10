import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent {
  @Output() editAddressCancel = new EventEmitter<boolean>();
  @Input() userId: number = 0;
  @Input() loggedInUser: User[] = [];

  sub:Subscription | undefined;

  editForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.editForm = fb.group({
      house: ['', Validators.required],
      building: ['', Validators.required],
      street: ['', Validators.required],
      barangay: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      zipcode: ['', Validators.required],
      username: [''],
      password: [''],
      firstName: [''],
      middleName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
      birthdate: [''],
      listOfInterest: [''],
    });
  }

  get house() {
    return this.editForm.get('house') as FormControl;
  }
  get building() {
    return this.editForm.get('building') as FormControl;
  }
  get street() {
    return this.editForm.get('street') as FormControl;
  }
  get barangay() {
    return this.editForm.get('barangay') as FormControl;
  }
  get city() {
    return this.editForm.get('city') as FormControl;
  }
  get province() {
    return this.editForm.get('province') as FormControl;
  }
  get zipcode() {
    return this.editForm.get('zipcode') as FormControl;
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUserById(this.userId).subscribe((user: User) => {
      this.editForm.patchValue(
        {
          username: user.username,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          birthdate: user.birthdate,
          listOfInterest: user.listOfInterest,
          house: user.house,
          building: user.building,
          street: user.street,
          barangay: user.barangay,
          city: user.city,
          province: user.province,
          zipcode: user.zipcode,
          password: user.password,
          role: user.role,
          status: user.status
        }
      )
    })
  }

  onSubmit = () => {
    if (this.editForm.valid) {
      const updatedUserData: User = {
        username: this.editForm.value.username,
        firstName: this.editForm.value.firstName,
        middleName: this.editForm.value.middleName,
        lastName: this.editForm.value.lastName,
        email: this.editForm.value.email,
        phoneNumber: this.editForm.value.phoneNumber,
        birthdate: this.editForm.value.birthdate,
        listOfInterest: this.editForm.value.listOfInterest,
        house: this.editForm.value.house,
        building: this.editForm.value.building,
        street: this.editForm.value.street,
        barangay: this.editForm.value.barangay,
        city: this.editForm.value.city,
        province: this.editForm.value.province,
        zipcode: this.editForm.value.zipcode,
        password: this.editForm.value.password,
        role: this.editForm.value.role,
        status: this.editForm.value.status
      };

      this.loggedInUser.forEach((data) => {
        if (data.email === this.editForm.value.email || data.username === this.editForm.value.username) {
          console.log("Email or username already exists");
          return;
        } else {
          this.editForm.reset();
          this.cancel();
        }
      });
      
      this.userService.updateUser(this.userId, updatedUserData).subscribe((res) => {
        console.log(res);
      });
      this.editForm.reset();
      this.cancel();
    }
  };

  cancel() {
    this.editAddressCancel.emit();
  }
}
