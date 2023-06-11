import { Component, EventEmitter, Input, OnInit, Output,  } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { 
  mobileNumberContainLetters, 
  mobileNumberIsValid } 
from 'src/app/modules/validators/custom.validator';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/modules/profile/services/user.service';
import { UserProfile } from '../../models/user-profile';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{
  @Input() userId: number = 0;
  @Input() loggedInUser: User[] = [];
  @Output() editProfileCancel = new EventEmitter<boolean>();
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
      listOfInterest: fb.array([new FormControl('', Validators.required)])
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
  
  ngOnInit(): void {
    this.getUseData();
  }

  getUseData() {
    this.userService.getUserById(this.userId).subscribe((user: UserProfile) => {
      this.editForm.patchValue(
        {
          username: user.username,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          birthdate: user.birthdate,
          // listOfInterest: [],
        }
      );
      this.listOfInterestArray.clear();
      
      user.listOfInterest.forEach((interest: string) => {
        this.listOfInterestArray.push(new FormControl(interest));
        
        console.log("Interest:", interest)
        console.log("List of Interest array: ", this.listOfInterestArray.value);
      });
    })
  }

  errorMessage: string = '';
  onSubmit = () => {
    if (this.editForm.valid) {
      const updatedUserData: UserProfile = {
        username: this.editForm.value.username,
        firstName: this.editForm.value.firstName,
        middleName: this.editForm.value.middleName,
        lastName: this.editForm.value.lastName,
        email: this.editForm.value.email,
        phoneNumber: this.editForm.value.phoneNumber,
        birthdate: this.editForm.value.birthdate,
        listOfInterest: this.editForm.value.listOfInterest
      };
      console.log("list of interest value in editform:",this.listOfInterest);

      this.loggedInUser.forEach((data) => {
        if (data.email === this.editForm.value.email || data.username === this.editForm.value.username) {
          this.errorMessage = "Email or username already exists";
          return;
        } else {
          alert('Profile successfully updated');
          this.editForm.reset();
          this.cancel();
        }
      });
      this.userService.updateUserProfile(this.userId, updatedUserData).subscribe((res) => {
        console.log(res);
      });
      
    }
  };

  cancel() {
    this.editProfileCancel.emit();
  }
}
