import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Request is on its way')

        console.log(req.url);

        const modifiedRequest = req.clone({headers: req.headers.append('Authorization', '123')});

    //    return next.handle(req);
       return next.handle(modifiedRequest).pipe(tap(event => {
           if(event.type === HttpEventType.Response) {
               console.log('Respone arrived!');
               console.log(event.body);
           }
       }));
    }
}