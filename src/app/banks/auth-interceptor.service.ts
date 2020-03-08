import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Request is on its way')

        console.log(req.url);

        const modifiedRequest = req.clone({headers: req.headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTYyNDJmZjU2MmExZTAzNTA3ZTI3YzAiLCJuYW1lIjoiQWJ1SnVkZSIsImlhdCI6MTU4MzQ5Nzk4M30.Kq-EIgCVhgVBr5iO-hvaabK7fLASe4NE96fm_eQQsrg')});

    //    return next.handle(req);
       return next.handle(modifiedRequest).pipe(tap(event => {
           if(event.type === HttpEventType.Response) {
               console.log('Respone arrived!');
               console.log(event.body);
           }
       }));
    }
}
