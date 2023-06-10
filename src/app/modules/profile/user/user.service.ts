import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  updateUser = (id: number, user: User) => {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTYW5kcmExMzMiLCJpYXQiOjE2ODYzODMyMDMsImV4cCI6MTY4NjM5NzYwM30.uLhSx9h68wEzHB8hid4zfwFyLV1VCFvL8K_O6nvXGzc'
    );
    return this.http.put(`${this.BASE_URL}/user/${id}`, user);
  }
}
