import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPassword } from '../models/user';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  BASE_URL = 'http://localhost:8080/api/v1';

  getUserById = (userId: number): Observable<User> => {
    return this.http.get<User>(`${this.BASE_URL}/user/${userId}`);
  }

  updateUserPasword = (id: number, user: UserPassword) => {
    return this.http.put(`${this.BASE_URL}/user/${id}`, user);
  }
}