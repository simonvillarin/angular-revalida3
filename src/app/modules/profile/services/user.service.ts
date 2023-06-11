import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { UserProfile } from '../models/user-profile';
import { UserAddress } from '../models/user-address';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  BASE_URL = 'http://localhost:8080/api/v1';

  getUserById = (userId: number): Observable<User> => {
    return this.http.get<User>(`${this.BASE_URL}/user/${userId}`);
  }

  updateUserProfile = (id: number, user: UserProfile) => {
    return this.http.put(`${this.BASE_URL}/user/${id}`, user);
  }

  updateUserAddress = (id: number, user: UserAddress) => {
    return this.http.put(`${this.BASE_URL}/user/${id}`, user);
  }
}
