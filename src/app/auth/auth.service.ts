import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserModel, AuthResponseData } from './user.model';
import { catchError, tap, throwIfEmpty } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = 'http://localhost:3000/users';
  user = new BehaviorSubject<UserModel>(null);
  tokenExpirationTimer: any;
  tokenDurationMilliSeconds = 60 * 60;

  constructor(private http: HttpClient, private router: Router) { }

  private handleAuthentication(userName: string
    , email: string
    , isAdmin: boolean
    , token: string
    , expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000))
        const user = new UserModel(userName
          , email
          , isAdmin
          , token
          , expirationDate);
          this.user.next(user);
          this.autoLogout(expiresIn * 1000)
          localStorage.setItem('userDate', JSON.stringify(user));
  }

  signup(userName: string, email: string, password: string) {

    return this.http
      .post<AuthResponseData>(this.serverUrl, { userName,email,password })
      .pipe(catchError(this.handleError), tap(resData =>
        this.handleAuthentication(resData.user.userName
          , resData.user.email
          , resData.user.isAdmin
          , resData.token
          , this.tokenDurationMilliSeconds)));

  }

  login(email: string, password: string) {

    return this.http
      .post<AuthResponseData>( this.serverUrl + '/login', { email, password} )
      .pipe(catchError(this.handleError), tap(resData =>
        this.handleAuthentication(resData.user.userName
          , resData.user.email
          , resData.user.isAdmin
          , resData.token
          , this.tokenDurationMilliSeconds)));

}

  autoLogin() {
    const userData: {
      userName: string,
      email: string,
      isAdmin: boolean,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
      return;
    }

    const loadedUser = new UserModel(userData.userName
        , userData.email
        , userData.isAdmin
        , userData._token
        , new Date(userData._tokenExpirationDate));

        if(loadedUser.token) {
          this.user.next(loadedUser);
          const expirationDuration = new Date(userData._tokenExpirationDate).getTime()
                  - new Date().getTime();
          this.autoLogout(expirationDuration)
        }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
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
