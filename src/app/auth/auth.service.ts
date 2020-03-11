import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserModel, AuthResponseData } from './user.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject<UserModel>();
  constructor(private http: HttpClient) { }

  signup(userName: string, email: string, password: string) {

    return this.http
      .post<AuthResponseData>('http://localhost:3000/users', { userName,email,password })
      .pipe(catchError(this.handleError), tap(resData =>
        this.handleAuthentication(resData.user.userName
          , resData.user.email
          , resData.user.isAdmin
          , resData.token)));
  }

  login(email: string, password: string) {
      return this.http
        .post<AuthResponseData>('http://localhost:3000/users/login', { email, password} )
        .pipe(catchError(this.handleError), tap(resData =>
          this.handleAuthentication(resData.user.userName
            , resData.user.email
            , resData.user.isAdmin
            , resData.token)));
  }

  private handleAuthentication(userName: string
    , email: string
    , isAdmin: boolean
    , token: string) {
        const expirationDate = new Date(new Date().getTime() + ((60 * 60) * 1000))
        const user = new UserModel(userName
          , email
          , isAdmin
          , token
          , expirationDate);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if(!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    errorMessage = errorRes.error.error;
    return throwError(errorMessage);
  }

}
