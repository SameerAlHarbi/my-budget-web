import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel, AuthResponseData } from './user.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(userName: string, email: string, password: string) {

    return this.http
      .post<AuthResponseData>('http://localhost:3000/users', { userName,email,password })
      .pipe(catchError( errorRes => {
        let errorMessage = 'An unknown error occured!';
        if(!errorRes.error || errorRes.error.error) {
          return throwError(errorMessage);
        }
        errorMessage = errorRes.error.error;
        return throwError(errorMessage);
    }));

  }

}
