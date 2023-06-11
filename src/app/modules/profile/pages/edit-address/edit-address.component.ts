import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { UserAddress } from '../../models/user-address';

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
    this.sub = this.userService.getUserById(this.userId).subscribe((user: UserAddress) => {
      this.editForm.patchValue(
        {
          house: user.house,
          building: user.building,
          street: user.street,
          barangay: user.barangay,
          city: user.city,
          province: user.province,
          zipcode: user.zipcode,
        }
      )
    })
  }

  onSubmit = () => {
    if (this.editForm.valid) {
      const updatedUserData: UserAddress = {
        house: this.editForm.value.house,
        building: this.editForm.value.building,
        street: this.editForm.value.street,
        barangay: this.editForm.value.barangay,
        city: this.editForm.value.city,
        province: this.editForm.value.province,
        zipcode: this.editForm.value.zipcode
      };
      
      this.userService.updateUserAddress(this.userId, updatedUserData).subscribe((res) => {
        console.log(res);
      });
      alert('Profile successfully updated');
      // this.editForm.reset();
      this.getUserData();
      this.cancel();
    }
  };

  cancel() {
    this.editAddressCancel.emit();
  }
}
