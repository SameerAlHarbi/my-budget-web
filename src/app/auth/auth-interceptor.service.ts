import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams, HttpHeaders, HttpEventType } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { take, exhaustMap, tap } from 'rxjs/operators';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Request is on its way')

    console.log(req.url);

    return this.authService.user
      .pipe(take(1), exhaustMap( user => {

        if(!user) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          headers: req.headers.append('Authorization', 'Bearer ' + user.token)
        });

        console.log(modifiedReq);

        return next.handle(modifiedReq).pipe(tap(event => {
          if(event.type === HttpEventType.Response) {
            console.log('Respone arrived!');
            console.log(event.body);
          }
        }));
      }));
  }

}
