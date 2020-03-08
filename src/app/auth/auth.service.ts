import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(user: UserModel) {
    this.http.post<UserModel>('http://localhost:3000/users', {
      userName:
    })
  }
}
