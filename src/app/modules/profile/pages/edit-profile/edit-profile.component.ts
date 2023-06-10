import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output,  } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  mobileNumberContainLetters, 
  mobileNumberIsValid } 
from 'src/app/modules/validators/custom.validator';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/modules/profile/user/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{
  @Input() userId: number = 0;
  @Input() loggedInUser: User[] = [];
  @Output() editProfileCancel = new EventEmitter<boolean>();
  @Output() updatedUserProfile = new EventEmitter<void>();
  editForm: FormGroup;
  listOfInterestArray: FormArray;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.editForm = fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', [
        Validators.required, 
        mobileNumberContainLetters(), 
        mobileNumberIsValid(),
      ]],
      birthdate: ['', Validators.required],
      listOfInterest: fb.array([new FormControl]),
      house: ['', Validators.required],
      building: ['', Validators.required],
      street: ['', Validators.required],
      barangay: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      zipcode: ['', Validators.required],
      password: [''],
      role: [''],
      status: ['']
    });
    this.listOfInterestArray = this.editForm.controls['listOfInterest'] as FormArray;
  }

  get username() {
    return this.editForm.get('username') as FormControl;
  }
  get firstName() {
    return this.editForm.get('firstName') as FormControl;
  }
  get middleName() {
    return this.editForm.get('middleName') as FormControl;
  }
  get lastName() {
    return this.editForm.get('lastName') as FormControl;
  }
  get email() {
    return this.editForm.get('email') as FormControl;
  }
  get phoneNumber() {
    return this.editForm.get('phoneNumber') as FormControl;
  }
  get birthdate() {
    return this.editForm.get('bday') as FormControl;
  }
  get listOfInterest() {
    return this.editForm.get('listOfInterest') as FormArray;
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
    this.getUseData();
    console.log(this.listOfInterestArray)
  }

  getUseData() {
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
          listOfInterest: [],
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
      );
      
      user.listOfInterest.forEach((interest) => {
        this.listOfInterestArray.push(new FormControl(interest));
      });
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
          alert('Profile successfully updated')
          this.editForm.reset();
          this.cancel();
        }
      });
      // const user = this.editForm.getRawValue();
      this.userService.updateUser(this.userId, updatedUserData).subscribe((res) => {
        console.log(res);
      });
    }
  };

  cancel() {
    this.editProfileCancel.emit();
    this.updatedUserProfile.emit();
    this.editForm.reset();
  }
}
